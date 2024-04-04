package com.example.site.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

@Entity
public class SolvedVariantVerdict {
    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private SolvedVariant variant;

    @NaturalId
    @Basic(optional = false)
    private int orderInVariant;

    private Verdict verdict;

    public SolvedVariantVerdict() {
    }

    public SolvedVariantVerdict(SolvedVariant variant, int orderInVariant, Verdict verdict) {
        this.variant = variant;
        this.orderInVariant = orderInVariant;
        this.verdict = verdict;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SolvedVariant getVariant() {
        return variant;
    }

    public void setVariant(SolvedVariant variant) {
        this.variant = variant;
    }

    public int getOrderInVariant() {
        return orderInVariant;
    }

    public void setOrderInVariant(int orderInVariant) {
        this.orderInVariant = orderInVariant;
    }

    public Verdict getVerdict() {
        return verdict;
    }

    public void setVerdict(Verdict verdict) {
        this.verdict = verdict;
    }
}
