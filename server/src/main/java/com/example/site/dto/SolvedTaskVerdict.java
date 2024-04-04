package com.example.site.dto;

import jakarta.persistence.Entity;

@Entity
public class SolvedTaskVerdict extends SolvedTask {
    private Verdict verdict;

    public SolvedTaskVerdict() {
    }

    public SolvedTaskVerdict(User user, Task task, Verdict verdict) {
        super(user, task);
        this.verdict = verdict;
    }

    public Verdict getVerdict() {
        return verdict;
    }

    public void setVerdict(Verdict verdict) {
        this.verdict = verdict;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj) &&
               obj instanceof SolvedTaskCase other &&
               instant.equals(other.instant);
    }
}
