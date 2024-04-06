package com.example.site.service;

import com.example.site.dto.SolvedTaskCase;
import com.example.site.dto.Task;
import com.example.site.dto.Task.Statistics;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {
    private final TaskService taskService;
    private final TaskSolutionService taskSolutionService;

    public StatsService(
            TaskService taskService,
            TaskSolutionService taskSolutionService
    ) {
        this.taskService = taskService;
        this.taskSolutionService = taskSolutionService;
    }

    @Transactional
    public void updateTaskStats() {
        for (Task task : taskService.getAll()) {
            List<SolvedTaskCase> cases = taskSolutionService.getAllByTask(task);
            long solvedCount = cases.stream()
                    .filter(SolvedTaskCase::getSolved).count();
            long solvedFirstTryCount = cases.stream()
                    .filter(SolvedTaskCase::firstTryRight).count();

            task.setStatistics(new Statistics(solvedCount, solvedFirstTryCount));
            taskService.save(task);
        }
    }
}
