package com.example.site.dto;

import jakarta.persistence.*;

@Embeddable
public record Verdict(
        @AttributeOverride(name = "rows", column = @Column(name = "userRows"))
        @AttributeOverride(name = "cols", column = @Column(name = "userCols"))
        @AttributeOverride(name = "data", column = @Column(name = "userData"))
        Answer userAnswer,
        Answer rightAnswer,
        @Basic(optional = false) Integer scores
) {
}
