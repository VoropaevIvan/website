package com.example.site.dto.vk;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VkResponse<T>(
        @JsonProperty("response") T value
) {
}
