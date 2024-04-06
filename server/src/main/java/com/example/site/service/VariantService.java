package com.example.site.service;

import com.example.site.dao.VariantRepository;
import com.example.site.dao.VariantTaskRepository;
import com.example.site.dto.Task;
import com.example.site.dto.Variant;
import com.example.site.dto.VariantTask;
import com.example.site.dto.rest.TaskRest;
import com.example.site.dto.rest.VariantRest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.*;

@Service
@Validated
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

    public Optional<VariantRest> get(@NotBlank String name) {
        Optional<Variant> optionalVariant = variantRepository.findByName(name);
        if (optionalVariant.isEmpty()) {
            return Optional.empty();
        }

        List<VariantTask> tasks = optionalVariant.get().getTasks();
        tasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));

        List<TaskRest> taskRestList = tasks.stream()
                .map(VariantTask::getTask)
                .map(TaskRest::from)
                .toList();

        return Optional.of(new VariantRest(
                taskRestList,
                optionalVariant.get().getMaxScore(),
                optionalVariant.get().getExam()
        ));
    }

    @Transactional
    public VariantRest post(@NotBlank String variantName, @Valid VariantRest variantRest) {
        List<Task> tasks = variantRest.tasks().stream()
                .map(TaskRest::toTask)
                .map(task -> taskService.edit(task.getId(), task)
                        .orElseGet(() -> taskService.add(task)))
                .toList();

        Variant variant = variantRepository.findByName(variantName)
                .orElseGet(() -> {
                    Variant newVar = new Variant(variantName);
                    newVar.setMaxScore(variantRest.maxScore());
                    newVar.setExam(variantRest.exam());
                    return variantRepository.save(newVar);
                });

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

        return new VariantRest(
                tasks.stream().map(TaskRest::from).toList(),
                variantRest.maxScore(),
                variantRest.exam()
        );
    }

    public boolean delete(@NotBlank String variantName) {
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
