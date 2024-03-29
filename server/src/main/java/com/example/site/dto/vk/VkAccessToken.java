package com.example.site.dto.vk;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VkAccessToken(
        @JsonProperty("access_token") String token,
        @JsonProperty("access_token_id") String tokenId,
        @JsonProperty("user_id") Long userId
) {
}
