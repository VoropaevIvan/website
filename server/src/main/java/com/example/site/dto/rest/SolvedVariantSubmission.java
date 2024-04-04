package com.example.site.dto.rest;

import com.example.site.dto.Answer;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SolvedVariantSubmission(
        @JsonProperty("userId")
        @NotNull
        Long userId,

        @JsonProperty("variant")
        @NotNull
        String variantName,

        @JsonProperty("answers")
        @NotNull
        List<Answer> answers
) {
}
