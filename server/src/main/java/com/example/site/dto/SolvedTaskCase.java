package com.example.site.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class SolvedTaskCase extends SolvedTask {
    @Basic(optional = false)
    protected Integer attempts;

    @Basic(optional = false)
    protected Boolean solved;

    @Basic(optional = false)
    protected Integer points;

    public SolvedTaskCase() {
    }

    public SolvedTaskCase(User user, Task task, Boolean solved) {
        super(user, task);
        this.solved = solved;
        this.attempts = 1;
        this.points = 0;
    }

    public Integer getAttempts() {
        return attempts;
    }

    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }

    public void addAttempt(boolean solved) {
        if (!getSolved()) {
            attempts++;
            setSolved(solved);
            setInstant(LocalDateTime.now());
        }
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    public boolean firstTryRight() {
        return solved && attempts == 1;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
