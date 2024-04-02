package com.example.site.service;

import com.example.site.dao.TaskRepository;
import com.example.site.dto.Task;
import com.example.site.dto.rest.TaskRest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@Validated
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskRest> getAll() {
        return taskRepository.findAll().stream()
                .map(TaskRest::fromTask)
                .toList();
    }

    public Optional<TaskRest> getById(long id) {
        return findById(id).map(TaskRest::fromTask);
    }

    public Optional<Task> findById(long id) {
        return taskRepository.findById(id);
    }

    public long add(@Valid TaskRest taskRest) {
        Task task = taskRest.toTask();
        return add(task).getId();
    }

    public Task add(Task task) {
        Instant now = Instant.now();
        task.setCreateDate(now);
        task.setEditDate(now);

        return save(task);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Optional<TaskRest> edit(Long id, @Valid TaskRest taskRest) {
        Task task = taskRest.toTask();
        return edit(id, task).map(TaskRest::fromTask);
    }

    public Optional<Task> edit(Long id, Task task) {
        if (id == null || !taskRepository.existsById(id)) {
            return Optional.empty();
        }

        task.setId(id);
        task.setEditDate(Instant.now());

        return Optional.of(save(task));
    }
}
