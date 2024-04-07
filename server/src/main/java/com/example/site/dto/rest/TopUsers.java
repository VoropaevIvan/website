package com.example.site.dto.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TopUsers(
        @JsonProperty("week") List<UserInfo> week,
        @JsonProperty("month") List<UserInfo> month,
        @JsonProperty("allTime") List<UserInfo> allTime
) {
    public record UserInfo(
            @JsonProperty("name") String name,
            @JsonProperty("surname") String surname,
            @JsonProperty("position") Integer position,
            @JsonProperty("balls") Integer ratingScore,
            @JsonProperty("isCurrentUser") Boolean currentUser
    ) {
    }
}
