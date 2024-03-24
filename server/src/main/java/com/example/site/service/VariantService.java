package com.example.site.service;

import com.example.site.dao.VariantRepository;
import com.example.site.dao.VariantTaskRepository;
import com.example.site.dto.Task;
import com.example.site.dto.Variant;
import com.example.site.dto.VariantTask;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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

    public List<String> getAll() {
        return variantRepository.findAll().stream().map(Variant::getName).toList();
    }

    public Optional<List<Task>> get(String variantName) {
        Optional<Variant> optionalVariant = variantRepository.findByName(variantName);
        if (optionalVariant.isEmpty()) {
            return Optional.empty();
        }
        List<VariantTask> tasks = optionalVariant.get().getTasks();
        tasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));
        return Optional.of(
                tasks.stream().map(VariantTask::getTask).toList()
        );
    }

    @Transactional
    public List<Task> post(String variantName, List<Task> tasks) {
        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            Task updated = taskService.edit(task.getId(), task)
                    .orElseGet(() -> taskService.add(task));
            tasks.set(i, updated);
        }
        Variant variant;
        List<VariantTask> variantTasks;
        Optional<Variant> optionalVariant = variantRepository.findByName(variantName);
        if (optionalVariant.isEmpty()) {
            variant = variantRepository.save(new Variant(variantName));
            variantTasks = Collections.emptyList();
        } else {
            variant = optionalVariant.get();
            variantTasks = variant.getTasks();
            variantTasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));
        }
        for (int i = 0; i < tasks.size(); i++) {
            VariantTask variantTask = new VariantTask(variant, i, tasks.get(i));
            if (i < variantTasks.size()) {
                variantTask.setId(variantTasks.get(i).getId());
            }
            variantTaskRepository.save(variantTask);
        }
        for (int i = tasks.size(); i < variantTasks.size(); i++) {
            variantTaskRepository.deleteById(variantTasks.get(i).getId());
        }
        return tasks;
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
}
