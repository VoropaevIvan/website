package com.example.site.service;

import com.example.site.dto.SolvedTaskCase;
import com.example.site.dto.Task.Statistics;
import com.example.site.dto.User;
import com.example.site.dto.rest.TaskInfo;
import com.example.site.dto.rest.TopUsers;
import com.example.site.dto.rest.TopUsers.UserInfo;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.*;
import java.util.*;

@Service
@Validated
public class StatsService {
    private record Score(User user, int value) {}

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

    public TopUsers getTopUsers(User user) {
        LocalDate now = LocalDate.now();
        LocalDate currentWeek = LocalDate.of(now.getYear(), now.getMonth(), 1);
        LocalDate currentMonth = LocalDate.of(now.getYear(), now.getMonth(), 1);

        List<User> users = userService.findAll();

        List<UserInfo> week = get10TopUsers(users, user, currentWeek);
        List<UserInfo> month = get10TopUsers(users, user, currentMonth);
        List<UserInfo> allTime = get10TopUsers(users, user, LocalDate.MIN);

        return new TopUsers(week, month, allTime);
    }

    private List<UserInfo> get10TopUsers(List<User> users, User currentUser, LocalDate localDate) {
        final int K = 10;
        LocalDateTime instant = LocalDateTime.of(localDate, LocalTime.MIN);

        Comparator<Score> scoreComparator = Comparator.comparingInt(Score::value);
        List<Score> scores = users.stream()
                .map(user -> new Score(user, calculateScore(user, instant)))
                .sorted(scoreComparator)
                .toList();

        List<UserInfo> userInfoList = new ArrayList<>(K + 1);
        boolean currentUserInTop = false;

        for (int i = 1; i <= K && i <= scores.size(); i++) {
            Score score = scores.get(scores.size() - i);
            User user = score.user();
            boolean isCurrentUser = user.equals(currentUser);
            if (isCurrentUser) {
                currentUserInTop = true;
            }

            userInfoList.add(new UserInfo(
                    user.getName(),
                    user.getSurname(),
                    i,
                    score.value(),
                    isCurrentUser));
        }

        if (currentUser == null || currentUserInTop) {
            return userInfoList;
        }

        Score currentUserScore = new Score(currentUser, calculateScore(currentUser, instant));
        int pos = Collections.binarySearch(scores, currentUserScore, scoreComparator);
        while (pos > 0 && scores.get(pos - 1).value() == currentUserScore.value()) {
            pos--;
        }

        while (pos < scores.size()) {
            if (scores.get(pos).user().equals(currentUser)) {
                userInfoList.add(new UserInfo(
                        currentUser.getName(),
                        currentUser.getSurname(),
                        pos + 1,
                        currentUserScore.value(),
                        true));
                return userInfoList;
            }
            pos++;
        }
        throw new RuntimeException("User(id=" + currentUser.getId() + ") has been deleted");
    }

    private int calculateScore(User user, LocalDateTime startInstant) {
        return taskSolutionService.getAllTaskCases(user).stream()
                .filter(SolvedTaskCase::getSolved)
                .filter(taskCase -> startInstant.isBefore(taskCase.getInstant()))
                .reduce(0, (acc, taskCase) -> acc + taskCase.getPoints(), Integer::sum);
    }
}
