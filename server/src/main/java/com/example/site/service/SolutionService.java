package com.example.site.service;

import com.example.site.dao.TaskSolutionRepository;
import com.example.site.dto.Task;
import com.example.site.dto.TaskSolution;
import com.example.site.dto.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class SolutionService {
    private static final Logger logger = LoggerFactory.getLogger(SolutionService.class);

    private final TaskSolutionRepository taskSolutionRepository;
    private final TaskService taskService;
    private final UserService userService;

    public SolutionService(
            TaskSolutionRepository taskSolutionRepository,
            TaskService taskService,
            UserService userService
    ) {
        this.taskSolutionRepository = taskSolutionRepository;
        this.taskService = taskService;
        this.userService = userService;
    }

    public boolean solve(TaskSolution taskSolution) {
        long userId = taskSolution.getUser().getId();
        Optional<User> optUser = userService.findUser(userId);
        if (optUser.isEmpty()) {
            logger.warn("User(id=" + userId + ") doesn't exist.");
            return false;
        }
        int taskId = taskSolution.getTask().getId();
        Optional<Task> optTask = taskService.findTaskById(taskId);
        if (optTask.isEmpty()) {
            logger.warn("Task(id=" + taskId + ") doesn't exist.");
            return false;
        }
        taskSolution.setUser(optUser.get());
        taskSolution.setTask(optTask.get());
        taskSolution.setInstant(Instant.now());
        taskSolutionRepository.save(taskSolution);
        return true;
    }
}
