package com.example.site.service.tasks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    public ResponseEntity<String> addNewTask(@RequestBody String jsonTask) {
        Task task;
        try {
            task = objectMapper.readValue(jsonTask, Task.class);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("JsonTaskParseError", HttpStatusCode.valueOf(422));
        }

        /*
        Task task = new Task()
                .setNumber(10)
                .setDescription(dsc)
                .setFiles("")
                .setAnswer(ans)
                .setLevel("easy")
                .setOfficial(false)
                .setRelevant(true)
                .setDateOfAdd(Timestamp.valueOf(LocalDateTime.now()))
                .setTopic("A sum of two numbers")
                .setSource("https://random.com/task/1")
                .setVideoReview("https://youtube.com/");
        */

        repository.save(task);
        return new ResponseEntity<>(String.valueOf(task.getId()), HttpStatusCode.valueOf(200));
    }
}
