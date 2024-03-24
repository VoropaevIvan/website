package com.example.site.controller;

import com.example.site.dto.Task;
import com.example.site.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable int id) {
        return taskService.findTaskById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public int addTask(@RequestBody Task task) {
        return taskService.add(task).getId();
    }

    @PostMapping("/{id}")
    public ResponseEntity<Task> editTask(@PathVariable int id, @RequestBody Task task) {
        return taskService.edit(id, task)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
