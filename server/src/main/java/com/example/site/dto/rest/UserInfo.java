package com.example.site.dto.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserInfo(
        @JsonProperty("name") String name,
        @JsonProperty("surname") String surname,
        @JsonProperty("position") Integer position,
        @JsonProperty("balls") Integer ratingScore,
        @JsonProperty("isCurrentUser") Boolean currentUser
) {
}
