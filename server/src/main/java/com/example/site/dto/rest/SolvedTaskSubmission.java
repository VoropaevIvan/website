package com.example.site.dto.rest;

import com.example.site.dto.Verdict;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record SolvedTaskSubmission(
        @JsonProperty("taskId")
        @NotNull
        Integer taskId,

        @JsonProperty("answer")
        @NotNull
        Verdict verdict,

        @JsonProperty("isRight")
        @NotNull
        Boolean solved
) {
}
