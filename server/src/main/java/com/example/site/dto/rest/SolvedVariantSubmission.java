package com.example.site.dto.rest;

import com.example.site.dto.SolvedVariant;
import com.example.site.dto.Verdict;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SolvedVariantSubmission(
        @JsonProperty("variantName")
        @NotBlank
        String variantName,

        @JsonProperty("answers")
        @NotNull
        Map<Integer, Verdict> verdicts,

        @JsonProperty("maxScore")
        Integer maxScore,

        @JsonProperty("isEGEFormat")
        Boolean exam,

        @JsonProperty("primaryScores")
        @NotNull
        @PositiveOrZero
        Integer primaryScore,

        @JsonProperty("scoresEGE")
        Integer finalScore
) {
        public void transferTo(SolvedVariant solvedVariant) {
                solvedVariant.setPrimaryScore(primaryScore);
                solvedVariant.setFinalScore(finalScore);
                solvedVariant.setExam(exam);
        }
}
