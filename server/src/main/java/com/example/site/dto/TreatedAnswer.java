package com.example.site.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Embeddable;

@Embeddable
public record TreatedAnswer(
        Answer answer,
        @Basic(optional = false) Integer scores
) {
}
