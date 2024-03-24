package com.example.site.service;

import com.example.site.dao.TaskRepository;
import com.example.site.dto.Task;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task add(Task task) {
        Instant instant = Instant.now();
        task.setAddDate(instant);
        task.setLastChangeDate(instant);
        return taskRepository.save(task);
    }

    public Optional<Task> edit(int id, Task task) {
        return taskRepository.findById(id).map(oldTask -> {
            task.setId(id);
            task.setAddDate(oldTask.getAddDate());
            task.setLastChangeDate(Instant.now());
            return taskRepository.save(task);
        });
    }
}
