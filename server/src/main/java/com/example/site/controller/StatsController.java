package com.example.site.controller;

import com.example.site.dto.User;
import com.example.site.dto.rest.TaskInfo;
import com.example.site.dto.rest.TopUsers;
import com.example.site.service.StatsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stats")
@CrossOrigin
public class StatsController {
    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public List<TaskInfo> getCurrentUser(@RequestAttribute(User.ATTR) User user) {
        return statsService.getCurrentUser(user);
    }

    @GetMapping("/users")
    public TopUsers getTopUsers(@RequestAttribute(name = User.ATTR, required = false) User user) {
        return statsService.getTopUsers(user);
    }
}
