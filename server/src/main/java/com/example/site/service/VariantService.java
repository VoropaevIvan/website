package com.example.site.service;

import com.example.site.dao.VariantTaskRepository;
import com.example.site.model.Task;
import com.example.site.model.VariantTask;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class VariantService {
    private final VariantTaskRepository variantTaskRepository;
    private final TaskService taskService;

    public VariantService(VariantTaskRepository variantTaskRepository, TaskService taskService) {
        this.variantTaskRepository = variantTaskRepository;
        this.taskService = taskService;
    }

    public Optional<List<Task>> get(String variantName) {
        List<VariantTask> variantTasks = variantTaskRepository.findAllByVariantName(variantName);
        if (variantTasks.isEmpty()) {
            return Optional.empty();
        }
        variantTasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));
        return Optional.of(
                variantTasks.stream().map(VariantTask::getTask).toList()
        );
    }

    @Transactional
    public List<Task> post(String variantName, List<Task> tasks) {
        List<VariantTask> variantTasks = variantTaskRepository.findAllByVariantName(variantName);
        variantTasks.sort(Comparator.comparingInt(VariantTask::getTaskOrder));

        // delete last tasks if a new variant has less than previous one
        for (int i = tasks.size(); i < variantTasks.size(); i++) {
            variantTaskRepository.deleteById(variantTasks.get(i).getId());
        }

        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            Task updated = taskService.edit(task.getId(), task)
                    .orElseGet(() -> taskService.add(task));
            if (variantTasks.size() > i) {
                VariantTask existed = variantTasks.get(i);
                existed.setTask(updated);
                variantTaskRepository.save(existed);
            } else {
                variantTaskRepository.save(new VariantTask(variantName, i, updated));
            }
            tasks.set(i, updated);
        }
        return tasks;
    }
}
