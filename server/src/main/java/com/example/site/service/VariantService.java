package com.example.site.service;

import com.example.site.dao.VariantRepository;
import com.example.site.dao.VariantTaskRepository;
import com.example.site.model.Task;
import com.example.site.model.Variant;
import com.example.site.model.VariantTask;
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

        // delete last tasks if a new variant has less than previous one
        for (int i = tasks.size(); i < variantTasks.size(); i++) {
            variantTaskRepository.deleteById(variantTasks.get(i).getId());
        }

        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            Task updated = taskService.edit(task.getId(), task)
                    .orElseGet(() -> taskService.add(task));
            VariantTask variantTask = new VariantTask(variant, i, updated);
            if (variantTasks.size() > i) {
                variantTask.setId(variantTasks.get(i).getId());
            }
            variantTaskRepository.save(variantTask);
            tasks.set(i, updated);
        }
        return tasks;
    }
}
