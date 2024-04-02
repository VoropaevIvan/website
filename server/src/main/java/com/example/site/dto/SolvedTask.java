package com.example.site.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

import java.time.Instant;

@Entity
public class SolvedTask {
    @Id
    @GeneratedValue
    Long id;

    @NaturalId
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    User user;

    @NaturalId
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    Task task;

    @Basic(optional = false)
    Integer attempts;

    @Basic(optional = false)
    Boolean solved;

    @Basic(optional = false)
    private Instant instant;

    public SolvedTask() {
    }

    public SolvedTask(User user, Task task, Boolean solved) {
        this.user = user;
        this.task = task;
        this.solved = solved;
        this.attempts = 1;
        this.instant = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Integer getAttempts() {
        return attempts;
    }

    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }

    public void addAttempt() {
        attempts++;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    public Instant getInstant() {
        return instant;
    }

    public void setInstant(Instant instant) {
        this.instant = instant;
    }

    @Override
    public int hashCode() {
        return user.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof SolvedTask other &&
               user.equals(other.user) &&
               task.equals(other.task);
    }
}
