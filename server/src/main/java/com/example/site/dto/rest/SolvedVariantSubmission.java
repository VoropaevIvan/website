package com.example.site.dto.rest;

import com.example.site.dto.TreatedAnswer;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record SolvedVariantSubmission(
        @JsonProperty("variantName")
        @NotNull
        String variantName,

        @JsonProperty("answers")
        @NotNull
        Map<Integer, TreatedAnswer> answers,

        @JsonProperty("isEGEFormat")
        Boolean exam,

        @JsonProperty("primaryScores")
        Integer primaryScore,

        @JsonProperty("scoresEGE")
        Integer finalScore
) {
}
