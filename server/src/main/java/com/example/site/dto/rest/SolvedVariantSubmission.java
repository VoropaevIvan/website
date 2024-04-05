package com.example.site.dto.rest;

import com.example.site.dto.SolvedVariant;
import com.example.site.dto.Verdict;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.HashMap;
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

        public static SolvedVariantSubmission from(SolvedVariant solvedVariant) {
                Map<Integer, Verdict> verdicts = new HashMap<>();
                for (var v : solvedVariant.getVerdicts()) {
                        verdicts.put(v.getOrderInVariant(), v.getVerdict());
                }

                return new SolvedVariantSubmission(
                        solvedVariant.getVariant().getName(),
                        verdicts,
                        solvedVariant.getVariant().getMaxScore(),
                        solvedVariant.getExam(),
                        solvedVariant.getPrimaryScore(),
                        solvedVariant.getFinalScore()
                );
        }
}
