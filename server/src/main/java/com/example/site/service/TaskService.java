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

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task getById(long id) {
        Optional<Task> optTask = findById(id);
        if (optTask.isEmpty()) {
            throw new RuntimeException("Task(id=" + id + ") doesn't exist");
        }
        return optTask.get();
    }

    public Optional<Task> findById(long id) {
        return taskRepository.findById(id);
    }

    public long add(@Valid TaskRest taskRest) {
        Task task = taskRest.toTask();
        return add(task).getId();
    }

    public Task add(Task task) {
        task.setId(null);
        task.setStatistics(new Task.Statistics(0L, 0L));

        Instant now = Instant.now();
        task.setCreateDate(now);
        task.setEditDate(now);

        return save(task);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Optional<TaskRest> edit(long id, @Valid TaskRest taskRest) {
        Task task = taskRest.toTask();
        return edit(id, task).map(TaskRest::from);
    }

    public Optional<Task> edit(Long id, Task task) {
        if (id == null) {
            return Optional.empty();
        }

        Optional<Task> oldTask = findById(id);
        if (oldTask.isEmpty()) {
            return Optional.empty();
        }

        task.setId(id);
        task.setStatistics(oldTask.get().getStatistics());
        task.setEditDate(Instant.now());

        return Optional.of(save(task));
    }
}
