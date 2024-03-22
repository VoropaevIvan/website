package com.example.site.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VkAccessToken(
        @JsonProperty("response") Response response
) {
    public record Response(
            @JsonProperty("access_token") String token,
            @JsonProperty("access_token_id") String tokenId,
            @JsonProperty("user_id") Long userId
    ) {
    }
}
