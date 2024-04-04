package com.example.site.service;

import com.example.site.dao.SolvedTaskAnswerRepository;
import com.example.site.dao.SolvedTaskCaseRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedTaskSubmission;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
public class TaskSolutionService {
    private final UserService userService;
    private final TaskService taskService;
    private final SolvedTaskCaseRepository solvedTaskCaseRepository;
    private final SolvedTaskAnswerRepository solvedTaskAnswerRepository;

    public TaskSolutionService(
            UserService userService,
            TaskService taskService,
            SolvedTaskCaseRepository solvedTaskCaseRepository,
            SolvedTaskAnswerRepository solvedTaskAnswerRepository
    ) {
        this.userService = userService;
        this.taskService = taskService;
        this.solvedTaskCaseRepository = solvedTaskCaseRepository;
        this.solvedTaskAnswerRepository = solvedTaskAnswerRepository;
    }

    @Transactional
    public void solve(Long userId, @Valid SolvedTaskSubmission submission) {
        Optional<User> optUser = userService.findUser(userId);
        if (optUser.isEmpty()) {
            throw new RuntimeException("User(id=" + userId + ") doesn't exist");
        }

        int taskId = submission.taskId();
        Optional<Task> optTask = taskService.findById(taskId);
        if (optTask.isEmpty()) {
            throw new RuntimeException("Task(id=" + taskId + ") doesn't exist");
        }

        SolvedTaskAnswer answer = new SolvedTaskAnswer(
                optUser.get(),
                optTask.get(),
                submission.answer());
        solvedTaskAnswerRepository.save(answer);

        Optional<SolvedTaskCase> optTaskCase = solvedTaskCaseRepository
                .findByUserAndTask(optUser.get(), optTask.get());

        SolvedTaskCase taskCase;
        if (optTaskCase.isPresent()) {
            taskCase = optTaskCase.get();
            taskCase.addAttempt();
            if (!taskCase.getSolved()) {
                taskCase.setSolved(submission.solved());
            }
        } else {
            taskCase = new SolvedTaskCase(
                    optUser.get(),
                    optTask.get(),
                    submission.solved());
        }

        solvedTaskCaseRepository.save(taskCase);
    }
}
