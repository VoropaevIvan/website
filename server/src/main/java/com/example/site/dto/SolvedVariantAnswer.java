package com.example.site.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

@Entity
public class SolvedVariantAnswer {
    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private SolvedVariant variant;

    @NaturalId
    @Basic(optional = false)
    private int orderInVariant;

    private TreatedAnswer answer;

    public SolvedVariantAnswer() {
    }

    public SolvedVariantAnswer(SolvedVariant variant, int orderInVariant, TreatedAnswer answer) {
        this.variant = variant;
        this.orderInVariant = orderInVariant;
        this.answer = answer;
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

    public TreatedAnswer getAnswer() {
        return answer;
    }

    public void setAnswer(TreatedAnswer answer) {
        this.answer = answer;
    }
}
