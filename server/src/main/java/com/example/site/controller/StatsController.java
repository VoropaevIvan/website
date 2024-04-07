package com.example.site.controller;

import com.example.site.dto.User;
import com.example.site.dto.rest.UserInfo;
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

    @PostMapping("/tasks")
    public void updateTaskStats() {
        statsService.updateTaskStats();
    }

    @GetMapping("/users")
    public List<UserInfo> getTopUsers(@RequestAttribute(name = User.ATTR, required = false) User user) {
        return statsService.getTopUsers(user);
    }
}
