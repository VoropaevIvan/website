package com.example.site.service.tasks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TaskRepository repository;

    @GetMapping("/{id}")
    public Task getTask(@PathVariable int id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/all")
    public Iterable<Task> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewTask(@RequestBody String requestBody) {
        Task task;
        try {
            TaskJson taskJson = objectMapper.readValue(requestBody, TaskJson.class);
            task = new Task(taskJson);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("JsonTaskParseError", HttpStatusCode.valueOf(422));
        }

        repository.save(task);
        return new ResponseEntity<>(String.valueOf(task.getId()), HttpStatusCode.valueOf(200));
    }
}
