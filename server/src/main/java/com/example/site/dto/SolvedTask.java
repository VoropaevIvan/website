package com.example.site.dto;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@MappedSuperclass
public class SolvedTask {
    @Id
    @GeneratedValue
    protected Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    protected User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    protected Task task;

    @Basic(optional = false)
    protected LocalDateTime instant;

    public SolvedTask() {
    }

    public SolvedTask(User user, Task task) {
        this.user = user;
        this.task = task;
        this.instant = LocalDateTime.now();
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

    public LocalDateTime getInstant() {
        return instant;
    }

    public void setInstant(LocalDateTime instant) {
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
