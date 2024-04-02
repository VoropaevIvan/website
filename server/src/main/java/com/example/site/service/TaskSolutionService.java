package com.example.site.service;

import com.example.site.dao.SolvedTaskRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedTaskSubmission;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
public class TaskSolutionService {
    private final UserService userService;
    private final TaskService taskService;
    private final SolvedTaskRepository solvedTaskRepository;

    public TaskSolutionService(
            UserService userService,
            TaskService taskService,
            SolvedTaskRepository solvedTaskRepository
    ) {
        this.solvedTaskRepository = solvedTaskRepository;
        this.userService = userService;
        this.taskService = taskService;
    }

    public void solve(@Valid SolvedTaskSubmission submission) {
        long userId = submission.userId();
        Optional<User> optUser = userService.findUser(userId);
        if (optUser.isEmpty()) {
            throw new RuntimeException("User(id=" + userId + ") doesn't exist");
        }

        int taskId = submission.taskId();
        Optional<Task> optTask = taskService.findById(taskId);
        if (optTask.isEmpty()) {
            throw new RuntimeException("Task(id=" + taskId + ") doesn't exist");
        }

        SolvedTask solution = new SolvedTask(
                optUser.get(),
                optTask.get(),
                submission.solved());

        solvedTaskRepository.save(solution);
    }
}
