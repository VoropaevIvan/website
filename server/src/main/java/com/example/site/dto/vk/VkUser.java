package com.example.site.dto.vk;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VkUser(
        @JsonProperty("first_name") String firstName,
        @JsonProperty("last_name") String lastName,
        @JsonProperty("deactivated") String deactivated,
        @JsonProperty(PHOTO_FIELD_NAME) String photoUrl
) {
    public static final String PHOTO_FIELD_NAME = "photo_50";
}
