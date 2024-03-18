package com.example.site.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

@Entity
public class VariantTask {

    @Id
    @GeneratedValue
    private long id;

    @NaturalId
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Variant variant;

    @NaturalId
    @Basic(optional = false)
    private int taskOrder;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Task task;

    public VariantTask() {
    }

    public VariantTask(Variant variant, int taskOrder, Task task) {
        this.variant = variant;
        this.taskOrder = taskOrder;
        this.task = task;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Variant getVariant() {
        return variant;
    }

    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    public int getTaskOrder() {
        return taskOrder;
    }

    public void setTaskOrder(int taskOrder) {
        this.taskOrder = taskOrder;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Override
    public int hashCode() {
        return variant.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof VariantTask other &&
               this.variant.equals(other.variant) &&
               this.taskOrder == other.taskOrder;
    }
}
