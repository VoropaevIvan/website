package com.example.site.service;

import com.example.site.dto.SolvedTaskCase;
import com.example.site.dto.Task;
import com.example.site.dto.Task.Statistics;
import com.example.site.dto.User;
import com.example.site.dto.rest.UserInfo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Validated
public class StatsService {
    public static final int TOP_SIZE = 10;

    private final UserService userService;
    private final TaskService taskService;
    private final TaskSolutionService taskSolutionService;

    public StatsService(
            UserService userService,
            TaskService taskService,
            TaskSolutionService taskSolutionService
    ) {
        this.userService = userService;
        this.taskService = taskService;
        this.taskSolutionService = taskSolutionService;
    }

    public List<UserInfo> getTopUsers(User user) {
        List<User> users = userService.findAll();
        Comparator<User> scoreComparator = Comparator.comparingInt(User::getRatingScore);
        users.sort(scoreComparator);

        List<UserInfo> userInfoList = new ArrayList<>(TOP_SIZE + 1);
        boolean currentUserInTop = false;

        for (int i = 1; i <= TOP_SIZE && i <= users.size(); i++) {
            User u = users.get(users.size() - i);
            boolean currentUser = u.equals(user);
            if (currentUser) {
                currentUserInTop = true;
            }

            userInfoList.add(new UserInfo(
                    u.getName(),
                    u.getSurname(),
                    i,
                    u.getRatingScore(),
                    currentUser));
        }

        if (user == null || currentUserInTop) {
            return userInfoList;
        }

        int pos = Collections.binarySearch(users, user, scoreComparator);
        while (pos > 0 && users.get(pos - 1).getRatingScore().equals(user.getRatingScore())) {
            pos--;
        }

        while (pos < users.size()) {
            if (users.get(pos).equals(user)) {
                userInfoList.add(new UserInfo(
                        user.getName(),
                        user.getSurname(),
                        pos + 1,
                        user.getRatingScore(),
                        true));
                return userInfoList;
            }
            pos++;
        }
        throw new RuntimeException("User(id=" + user.getId() + ") has been deleted");
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
