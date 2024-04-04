package com.example.site.dto.rest;

import com.example.site.dto.Answer;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record SolvedTaskSubmission(
        @JsonProperty("taskId")
        @NotNull
        Integer taskId,

        @JsonProperty("answer")
        @NotNull
        Answer answer,

        @JsonProperty("isRight")
        @NotNull
        Boolean solved
) {
}
