package com.example.site.dto.rest;

import com.example.site.dto.Answer;
import com.example.site.dto.Task;
import com.example.site.dto.Task.Statistics;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record TaskRest(
        @JsonProperty("id")
        Long id,

        @JsonProperty("content")
        @NotNull
        String content,

        @JsonProperty("answer")
        @NotNull
        Answer answer,

        @JsonProperty("stats")
        Statistics statistics,

        @JsonProperty("numberEGE")
        @NotNull
        String number,

        @JsonProperty("hiddenInBank")
        Boolean hidden,

        @JsonProperty("isOfficial")
        Boolean official,

        @JsonProperty("actuality")
        String actuality,

        @JsonProperty("difficulty")
        String difficulty,

        @JsonProperty("source")
        String source,

        @JsonProperty("topic")
        Integer topic,

        @JsonProperty("files")
        String files,

        @JsonProperty("addDate")
        Instant createDate,

        @JsonProperty("lastChangeDate")
        Instant editDate,

        @JsonProperty("videoReview")
        String videoReview,

        @JsonProperty("solution")
        String solution,

        @JsonProperty(value = "userAnswer")
        UserAnswer userAnswer

) {
    public enum UserAnswer {
        ABSENT, WRONG, RIGHT, FIRST_TRY_RIGHT
    }

    public static TaskRest from(Task task) {
        return TaskRest.from(task, null);
    }

    public static TaskRest from(Task task, UserAnswer answer) {
        return new TaskRest(
                task.getId(),
                task.getContent(),
                task.getAnswer(),
                task.getStatistics(),
                task.getNumber(),
                task.isHidden(),
                task.isOfficial(),
                task.getActuality(),
                task.getDifficulty(),
                task.getSource(),
                task.getTopic(),
                task.getFiles(),
                task.getCreateDate(),
                task.getEditDate(),
                task.getVideoReview(),
                task.getSolution(),
                answer
        );
    }

    public Task toTask() {
        Task task = new Task();

        task.setId(id);
        task.setContent(content);
        task.setAnswer(answer);
//        task.setStatistics(statistics);
        task.setNumber(number);
        task.setHidden(hidden);
        task.setOfficial(official);
        task.setActuality(actuality);
        task.setDifficulty(difficulty);
        task.setSource(source);
        task.setTopic(topic);
        task.setFiles(files);
        task.setCreateDate(createDate);
        task.setEditDate(editDate);
        task.setVideoReview(videoReview);
        task.setSolution(solution);

        return task;
    }
}
