package com.example.site.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record Answer(
        @Basic(optional = false)
        Integer rows,
        @Basic(optional = false)
        Integer cols,
        @Basic(optional = false)
        @Column(length = Task.MAX_LENGTH)
        String data
) {
}
