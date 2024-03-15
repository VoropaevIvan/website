package com.example.site.service.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @GetMapping
    public List<Task> getTasks() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable int id) {
        Optional<Task> optTask = repository.findById(id);
        return optTask.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public int addTask(@RequestBody Task task) {
        repository.save(task);
        return task.getId();
    }

    @PostMapping("/{id}")
    public ResponseEntity<Task> editTask(@PathVariable int id, @RequestBody Task task) {
        Optional<Task> optTask = repository.findById(id);
        if (optTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        task.setId(optTask.get().getId());
        repository.save(task);
        return ResponseEntity.ok(task);
    }
}
