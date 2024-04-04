package com.example.site.dto;

import jakarta.persistence.Entity;

@Entity
public class SolvedTaskAnswer extends SolvedTask {
    private TreatedAnswer answer;

    public SolvedTaskAnswer() {
    }

    public SolvedTaskAnswer(User user, Task task, TreatedAnswer answer) {
        super(user, task);
        this.answer = answer;
    }

    public TreatedAnswer getAnswer() {
        return answer;
    }

    public void setAnswer(TreatedAnswer answer) {
        this.answer = answer;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj) &&
               obj instanceof SolvedTaskCase other &&
               instant.equals(other.instant);
    }
}
