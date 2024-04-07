package com.example.site.dto.rest;

import com.example.site.dto.Task.Statistics;
import com.fasterxml.jackson.annotation.JsonProperty;

public record TaskInfo(
        @JsonProperty("numberEGE") String number,
        @JsonProperty("stats") Statistics statistics
) {
}
