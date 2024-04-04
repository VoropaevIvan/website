package com.example.site.service;

import com.example.site.dao.VariantRepository;
import com.example.site.dao.VariantTaskRepository;
import com.example.site.dto.Task;
import com.example.site.dto.Variant;
import com.example.site.dto.VariantTask;
import com.example.site.dto.rest.TaskRest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VariantService {
    private final VariantRepository variantRepository;
    private final VariantTaskRepository variantTaskRepository;
    private final TaskService taskService;

    public VariantService(
            VariantRepository variantRepository,
            VariantTaskRepository variantTaskRepository,
            TaskService taskService
    ) {
        this.variantRepository = variantRepository;
        this.variantTaskRepository = variantTaskRepository;
        this.taskService = taskService;
    }

    public List<String> getAllNames() {
        return variantRepository.findAll().stream()
                .map(Variant::getName)
                .toList();
    }

    public Optional<List<TaskRest>> getTasks(String name) {
        Optional<Variant> optionalVariant = variantRepository.findByName(name);
        if (optionalVariant.isEmpty()) {
            return Optional.empty();
        }

        List<VariantTask> tasks = optionalVariant.get().getTasks();
        tasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));

        List<TaskRest> taskRestList = tasks.stream()
                .map(VariantTask::getTask)
                .map(TaskRest::fromTask)
                .toList();

        return Optional.of(taskRestList);
    }

    @Transactional
    public List<TaskRest> post(String variantName, List<TaskRest> taskRestList) {
        List<Task> tasks = taskRestList.stream()
                .map(TaskRest::toTask)
                .map(task -> taskService.edit(task.getId(), task)
                        .orElseGet(() -> taskService.add(task)))
                .toList();

        Variant variant = variantRepository.findByName(variantName)
                .orElseGet(() -> variantRepository.save(new Variant(variantName)));

        List<VariantTask> variantTasks = Optional.ofNullable(variant.getTasks())
                .orElse(new ArrayList<>());

        variantTasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));

        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            VariantTask variantTask;

            if (i < variantTasks.size()) {
                variantTask = variantTasks.get(i);
                variantTask.setTask(task);
            } else {
                variantTask = new VariantTask(variant, i, task);
            }

            variantTaskRepository.save(variantTask);
        }

        for (int i = tasks.size(); i < variantTasks.size(); i++) {
            variantTaskRepository.deleteById(variantTasks.get(i).getId());
        }

        return tasks.stream()
                .map(TaskRest::fromTask)
                .toList();
    }

    public boolean delete(String variantName) {
        Optional<Variant> optionalVariant = variantRepository.findByName(variantName);
        if (optionalVariant.isEmpty()) {
            return false;
        }

        Variant variant = optionalVariant.get();
        for (VariantTask task : variant.getTasks()) {
            variantTaskRepository.deleteById(task.getId());
        }

        variantRepository.deleteById(variant.getId());

        return true;
    }

    public Optional<Variant> findById(long id) {
        return variantRepository.findById(id);
    }

    public Variant save(Variant variant) {
        return variantRepository.save(variant);
    }

    public Optional<Variant> findByName(String name) {
        return variantRepository.findByName(name);
    }

    public Variant getByName(String name) {
        Optional<Variant> optVariant = findByName(name);
        if (optVariant.isEmpty()) {
            throw new RuntimeException("Variant(name=" + name + ") doesn't exist");
        }
        return optVariant.get();
    }
}
