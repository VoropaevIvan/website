package com.example.site.controller;

import com.example.site.dto.User;
import com.example.site.dto.rest.SolvedTaskSubmission;
import com.example.site.dto.rest.SolvedVariantSubmission;
import com.example.site.service.TaskSolutionService;
import com.example.site.service.VariantSolutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/solves")
public class SolutionController {
    private final TaskSolutionService taskSolutionService;
    private final VariantSolutionService variantSolutionService;

    public SolutionController(
            TaskSolutionService taskSolutionService,
            VariantSolutionService variantSolutionService
    ) {
        this.taskSolutionService = taskSolutionService;
        this.variantSolutionService = variantSolutionService;
    }

    @PostMapping("/task")
    public void solveTask(
            @RequestAttribute(User.ATTR) User user,
            @RequestBody SolvedTaskSubmission submission
    ) {
        taskSolutionService.solve(user, submission);
    }

    @PostMapping("/variant")
    public void solveVariant(
            @RequestAttribute(User.ATTR) User user,
            @RequestBody SolvedVariantSubmission submission
    ) {
        variantSolutionService.solve(user, submission);
    }
}
