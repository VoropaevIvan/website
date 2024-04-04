package com.example.site.service;

import com.example.site.dao.SolvedTaskAnswerRepository;
import com.example.site.dao.SolvedTaskCaseRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedTaskSubmission;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
    public void solve(@NotNull Long userId, @Valid SolvedTaskSubmission submission) {
        User user = userService.getById(userId);
        Task task = taskService.getById(submission.taskId());

        solvedTaskAnswerRepository.save(new SolvedTaskAnswer(user, task, submission.answer()));

        Optional<SolvedTaskCase> optTaskCase = solvedTaskCaseRepository.findByUserAndTask(user, task);

        SolvedTaskCase taskCase;
        if (optTaskCase.isPresent()) {
            taskCase = optTaskCase.get();
            taskCase.addAttempt();
            if (!taskCase.getSolved()) {
                taskCase.setSolved(submission.solved());
            }
        } else {
            taskCase = new SolvedTaskCase(user, task, submission.solved());
        }

        solvedTaskCaseRepository.save(taskCase);
    }
}
