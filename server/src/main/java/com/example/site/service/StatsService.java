package com.example.site.service;

import com.example.site.dto.SolvedTaskCase;
import com.example.site.dto.Task.Statistics;
import com.example.site.dto.User;
import com.example.site.dto.rest.TaskInfo;
import com.example.site.dto.rest.UserInfo;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.*;

@Service
@Validated
public class StatsService {
    public static final int TOP_SIZE = 10;

    private final UserService userService;
    private final TaskSolutionService taskSolutionService;

    public StatsService(
            UserService userService,
            TaskSolutionService taskSolutionService
    ) {
        this.userService = userService;
        this.taskSolutionService = taskSolutionService;
    }

    public List<TaskInfo> getCurrentUser(@NotNull User user) {
        List<SolvedTaskCase> taskCases = taskSolutionService.getAllTaskCases(user);

        Map<String, List<Long>> taskCasesByNumber = new HashMap<>();
        final int solvedPos = 0;
        final int solvedFirstTryPos = 1;

        for (SolvedTaskCase taskCase : taskCases) {
            String number = taskCase.getTask().getNumber();
            List<Long> solutionCount = taskCasesByNumber.computeIfAbsent(number, k ->
                    new ArrayList<>(List.of(0L, 0L)));

            if (taskCase.getSolved()) {
                solutionCount.set(solvedPos, solutionCount.get(solvedPos) + 1);
            }
            if (taskCase.firstTryRight()) {
                solutionCount.set(solvedFirstTryPos, solutionCount.get(solvedFirstTryPos) + 1);
            }
        }

        return taskCasesByNumber.entrySet().stream()
                .map(e -> new TaskInfo(e.getKey(), new Statistics(
                        e.getValue().get(solvedPos),
                        e.getValue().get(solvedFirstTryPos))))
                .toList();
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
}
