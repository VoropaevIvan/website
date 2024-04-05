package com.example.site.dto;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

@Entity
public class SolvedVariant {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Variant variant;

    @OneToMany(mappedBy = "variant")
    private List<SolvedVariantVerdict> verdicts;

    @Basic(optional = false)
    private Integer primaryScore;

    private Integer finalScore;

    private Boolean exam;

    @Basic(optional = false)
    private Instant instant;

    public SolvedVariant() {
    }

    public SolvedVariant(User user, Variant variant) {
        this.user = user;
        this.variant = variant;
        this.instant = Instant.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Variant getVariant() {
        return variant;
    }

    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    public List<SolvedVariantVerdict> getVerdicts() {
        return verdicts;
    }

    public void setVerdicts(List<SolvedVariantVerdict> verdicts) {
        this.verdicts = verdicts;
    }

    public Integer getPrimaryScore() {
        return primaryScore;
    }

    public void setPrimaryScore(Integer primaryScore) {
        this.primaryScore = primaryScore;
    }

    public Integer getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(Integer finalScore) {
        this.finalScore = finalScore;
    }

    public Boolean getExam() {
        return exam;
    }

    public void setExam(Boolean exam) {
        this.exam = exam;
    }

    public Instant getInstant() {
        return instant;
    }

    public void setInstant(Instant instant) {
        this.instant = instant;
    }
}
