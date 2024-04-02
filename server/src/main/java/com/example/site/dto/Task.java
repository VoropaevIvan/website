package com.example.site.dto;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Task {
    @Embeddable
    public record Answer(
            @Basic(optional = false)
            Integer rows,
            @Basic(optional = false)
            Integer cols,
            @Basic(optional = false)
            @Column(length = MAX_LENGTH)
            String data
    ) {
    }

    private static final int MAX_LENGTH = 10_000;

    @Id
    @GeneratedValue
    private Long id;

    @Basic(optional = false)
    @Column(length = MAX_LENGTH)
    private String content;

    private Answer answer;

    @Basic(optional = false)
    private String number;

    private boolean hidden;

    private boolean official;

    private String actuality;

    private String difficulty;

    @Column(length = MAX_LENGTH)
    private String source;

    private int topic;

    @Column(length = MAX_LENGTH)
    private String files;

    private Instant createDate;

    private Instant editDate;

    @Column(length = MAX_LENGTH)
    private String videoReview;

    @Column(length = MAX_LENGTH)
    private String solution;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public boolean isOfficial() {
        return official;
    }

    public void setOfficial(boolean official) {
        this.official = official;
    }

    public String getActuality() {
        return actuality;
    }

    public void setActuality(String actuality) {
        this.actuality = actuality;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getTopic() {
        return topic;
    }

    public void setTopic(int topic) {
        this.topic = topic;
    }

    public String getFiles() {
        return files;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getEditDate() {
        return editDate;
    }

    public void setEditDate(Instant editDate) {
        this.editDate = editDate;
    }

    public String getVideoReview() {
        return videoReview;
    }

    public void setVideoReview(String videoReview) {
        this.videoReview = videoReview;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof Task other && id.equals(other.id);
    }
}
