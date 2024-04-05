package com.example.site.dto.rest;

import com.example.site.dto.SolvedVariant;
import com.example.site.dto.SolvedVariantVerdict;
import com.example.site.dto.Verdict;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SolvedVariantReply(
        @JsonProperty("variantName")
        String variantName,

        @JsonProperty("answers")
        List<Verdict> verdicts,

        @JsonProperty("maxScore")
        Integer maxScore,

        @JsonProperty("isEGEFormat")
        Boolean exam,

        @JsonProperty("primaryScores")
        Integer primaryScore,

        @JsonProperty("scoresEGE")
        Integer finalScore
) {
    public static SolvedVariantReply from(SolvedVariant solvedVariant) {
        List<Verdict> verdicts = solvedVariant.getVerdicts().stream()
                .map(SolvedVariantVerdict::getVerdict).toList();

        return new SolvedVariantReply(
                solvedVariant.getVariant().getName(),
                verdicts,
                solvedVariant.getVariant().getMaxScore(),
                solvedVariant.getExam(),
                solvedVariant.getPrimaryScore(),
                solvedVariant.getFinalScore()
        );
    }
}
