package com.example.site.service;

import com.example.site.dao.SolvedTaskVerdictRepository;
import com.example.site.dao.SolvedTaskCaseRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedTaskSubmission;
import com.example.site.dto.rest.TaskRest;
import com.example.site.dto.rest.TaskRest.UserAnswer;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Validated
public class TaskSolutionService {
    private final TaskService taskService;
    private final SolvedTaskCaseRepository solvedTaskCaseRepository;
    private final SolvedTaskVerdictRepository solvedTaskVerdictRepository;

    public TaskSolutionService(
            TaskService taskService,
            SolvedTaskCaseRepository solvedTaskCaseRepository,
            SolvedTaskVerdictRepository solvedTaskVerdictRepository
    ) {
        this.taskService = taskService;
        this.solvedTaskCaseRepository = solvedTaskCaseRepository;
        this.solvedTaskVerdictRepository = solvedTaskVerdictRepository;
    }

    @Transactional
    public void solve(@NotNull User user, @Valid SolvedTaskSubmission submission) {
        Task task = taskService.getById(submission.taskId());
        Verdict fullVerdict = new Verdict(
                submission.verdict().userAnswer(),
                task.getAnswer(),
                submission.verdict().scores());

        solvedTaskVerdictRepository.save(new SolvedTaskVerdict(user, task, fullVerdict));

        Optional<SolvedTaskCase> optTaskCase = findTaskCase(user, task);

        SolvedTaskCase taskCase;
        if (optTaskCase.isPresent()) {
            taskCase = optTaskCase.get();
            taskCase.addAttempt(submission.solved());
        } else {
            taskCase = new SolvedTaskCase(user, task, submission.solved());
        }

        solvedTaskCaseRepository.save(taskCase);
    }

    private Optional<SolvedTaskCase> findTaskCase(User user, Task task) {
        return solvedTaskCaseRepository.findByUserAndTask(user, task);
    }

    public List<TaskRest> getAllTasks(User user) {
        List<Task> tasks = taskService.getAll();

        if (user == null) {
            return tasks.stream()
                    .map(task -> TaskRest.from(task, TaskRest.UserAnswer.ABSENT))
                    .toList();
        }

        Map<Long, SolvedTaskCase> taskCaseMap = new HashMap<>();
        getAllTaskCases(user).forEach(taskCase ->
                taskCaseMap.put(taskCase.getTask().getId(), taskCase));

        return tasks.stream().map(task -> {
            SolvedTaskCase taskCase = taskCaseMap.get(task.getId());
            return TaskRest.from(task, getUserAnswer(taskCase));
        }).toList();
    }

    private List<SolvedTaskCase> getAllTaskCases(User user) {
        return solvedTaskCaseRepository.findAllByUser(user);
    }

    private UserAnswer getUserAnswer(SolvedTaskCase taskCase) {
        if (taskCase == null) {
            return UserAnswer.ABSENT;
        }
        if (!taskCase.getSolved()) {
            return UserAnswer.WRONG;
        }
        if (taskCase.firstTryRight()) {
            return UserAnswer.FIRST_TRY_RIGHT;
        }
        return UserAnswer.RIGHT;
    }

    public Optional<TaskRest> getRestById(User user, long taskId) {
        Optional<Task> optTask = taskService.findById(taskId);
        if (optTask.isEmpty()) {
            return Optional.empty();
        }

        Task task = optTask.get();
        if (user == null) {
            return Optional.of(TaskRest.from(task, TaskRest.UserAnswer.ABSENT));
        }

        SolvedTaskCase taskCase = findTaskCase(user, task).orElse(null);

        return Optional.of(TaskRest.from(task, getUserAnswer(taskCase)));
    }

    public List<SolvedTaskCase> getAllByTask(Task task) {
        return solvedTaskCaseRepository.findAllByTask(task);
    }
}
