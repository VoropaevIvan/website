package com.example.site.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Entity;

@Entity
public class SolvedTaskCase extends SolvedTask {
    @Basic(optional = false)
    protected Integer attempts;

    @Basic(optional = false)
    protected Boolean solved;

    public SolvedTaskCase() {
    }

    public SolvedTaskCase(User user, Task task, Boolean solved) {
        super(user, task);
        this.solved = solved;
        this.attempts = 1;
    }

    public Integer getAttempts() {
        return attempts;
    }

    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }

    public void addAttempt() {
        this.attempts++;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }
}
