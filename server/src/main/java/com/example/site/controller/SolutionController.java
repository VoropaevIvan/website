package com.example.site.controller;

import com.example.site.dto.TaskSolution;
import com.example.site.service.SolutionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/solves")
public class SolutionController {
    private static final Logger logger = LoggerFactory.getLogger(SolutionController.class);

    private final SolutionService solutionService;

    public SolutionController(SolutionService solutionService) {
        this.solutionService = solutionService;
    }

    @PostMapping("/task")
    public ResponseEntity<?> solveTask(@RequestBody TaskSolution taskSolution) {
        logger.info("Solve task request.");
        if (solutionService.solve(taskSolution)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
