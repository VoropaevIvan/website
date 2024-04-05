package com.example.site.dto.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public record VariantRest(
        @JsonProperty("tasks")
        @NotNull
        List<TaskRest> tasks,

        @JsonProperty("maxScore")
        @NotNull
        @PositiveOrZero
        Integer maxScore
) {
}
