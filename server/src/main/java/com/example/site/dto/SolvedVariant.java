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
    private List<SolvedVariantAnswer> answers;

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

    public List<SolvedVariantAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SolvedVariantAnswer> answers) {
        this.answers = answers;
    }

    public Instant getInstant() {
        return instant;
    }

    public void setInstant(Instant instant) {
        this.instant = instant;
    }
}
