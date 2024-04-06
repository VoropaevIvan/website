package com.example.site.controller;

import com.example.site.dto.rest.TaskRest;
import com.example.site.service.TaskService;
import com.example.site.service.TaskSolutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    private final TaskSolutionService taskSolutionService;

    public TaskController(TaskService taskService, TaskSolutionService taskSolutionService) {
        this.taskService = taskService;
        this.taskSolutionService = taskSolutionService;
    }

    @GetMapping
    public List<TaskRest> getAll(@RequestAttribute Long userId) {
        return taskSolutionService.getAllTasks(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskRest> getById(@RequestAttribute Long userId, @PathVariable long taskId) {
        return taskSolutionService.getRestById(userId, taskId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public long add(@RequestBody TaskRest task) {
        return taskService.add(task);
    }

    @PostMapping("/{id}")
    public ResponseEntity<TaskRest> edit(@PathVariable long id, @RequestBody TaskRest task) {
        return taskService.edit(id, task)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
