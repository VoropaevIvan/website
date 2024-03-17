package com.example.site.model;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

@Entity
public class VariantTask {

    @Id
    @GeneratedValue
    private long id;

    @NaturalId
    private String variantName;

    @NaturalId
    private int taskOrder;

    @ManyToOne(optional = false)
    private Task task;

    public VariantTask() {
    }

    public VariantTask(String variantName, int taskOrder, Task task) {
        this.variantName = variantName;
        this.taskOrder = taskOrder;
        this.task = task;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName;
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
}
