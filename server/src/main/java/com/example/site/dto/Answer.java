package com.example.site.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record Answer(
        Integer rows,
        Integer cols,
        @Column(length = Task.MAX_LENGTH)
        String data
) {
}
