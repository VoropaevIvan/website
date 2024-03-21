package com.example.site.dto;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * This class contains information about the exam task.
 * <p>
 * <table>
 *   <tr>
 *       <th>Field</th>
 *       <th>Description</th>
 *   </tr>
 *   <tr>
 *     <th>num</th>
 *     <td>The number of task in the exam.</td>
 *   </tr>
 *   <tr>
 *     <th>dsc</th>
 *     <td>The condition text of the task.</td>
 *   </tr>
 *   <tr>
 *     <th>ans</th>
 *     <td>The answer is JSON that represents a number or a table of numbers.</td>
 *   </tr>
 *   <tr>
 *     <th>topic</th>
 *     <td>The topic of the task.</td>
 *   </tr>
 *   <tr>
 *     <th>src</th>
 *     <td>URL of the source.</td>
 *   </tr>
 *   <tr>
 *     <th>lvl</th>
 *     <td>The difficulty of the task.</td>
 *   </tr>
 *   <tr>
 *     <th>isRelevant</th>
 *     <td>Is the task a relevant exam task?</td>
 *   </tr>
 *   <tr>
 *     <th>isOfficial</th>
 *     <td>Is the task an official exam task?</td>
 *   </tr>
 *   <tr>
 *     <th>files</th>
 *     <td>JSON list of files related to the task.</td>
 *   </tr>
 *   <tr>
 *     <th>dateOfAdd</th>
 *     <td>The date of the task appearance.</td>
 *   </tr>
 *   <tr>
 *     <th>videoReview</th>
 *     <td>VideoReview URL of the task video review.</td>
 *   </tr>
 * </table>
 */
@Entity
public class Task {

    @Embeddable
    public record Answer(
            @Basic(optional = false) int rows,
            @Basic(optional = false) int cols,
            @Basic(optional = false)
            @Column(length = MAX_LENGTH)
            String data
    ) {
    }

    private static final int MAX_LENGTH = 10_000;

    @Id
    @GeneratedValue
    private int id;

    @Basic(optional = false)
    @Column(length = MAX_LENGTH)
    private String content;

    private Answer answer;

    @Basic(optional = false)
    private String numberEGE;

    private boolean hiddenInBank;
    private boolean isOfficial;
    private String actuality;
    private String difficulty;

    @Column(length = MAX_LENGTH)
    private String source;

    private int topic;

    @Column(length = MAX_LENGTH)
    private String files;

    private LocalDateTime addDate;
    private LocalDateTime lastChangeDate;

    @Column(length = MAX_LENGTH)
    private String videoReview;

    @Column(length = MAX_LENGTH)
    private String solution;


    public int getId() {
        return id;
    }

    public Task setId(int id) {
        this.id = id;
        return this;
    }

    public String getContent() {
        return content;
    }

    public Task setContent(String content) {
        this.content = content;
        return this;
    }

    public Answer getAnswer() {
        return answer;
    }

    public Task setAnswer(Answer answer) {
        this.answer = answer;
        return this;
    }

    public String getNumberEGE() {
        return numberEGE;
    }

    public Task setNumberEGE(String numberEGE) {
        this.numberEGE = numberEGE;
        return this;
    }

    public boolean getHiddenInBank() {
        return hiddenInBank;
    }

    public Task setHiddenInBank(boolean hiddenInBank) {
        this.hiddenInBank = hiddenInBank;
        return this;
    }

    public boolean getIsOfficial() {
        return isOfficial;
    }

    public Task setIsOfficial(boolean official) {
        isOfficial = official;
        return this;
    }

    public String getActuality() {
        return actuality;
    }

    public Task setActuality(String actuality) {
        this.actuality = actuality;
        return this;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public Task setDifficulty(String difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public String getSource() {
        return source;
    }

    public Task setSource(String source) {
        this.source = source;
        return this;
    }

    public int getTopic() {
        return topic;
    }

    public Task setTopic(int topic) {
        this.topic = topic;
        return this;
    }

    public String getFiles() {
        return files;
    }

    public Task setFiles(String files) {
        this.files = files;
        return this;
    }

    public LocalDateTime getAddDate() {
        return addDate;
    }

    public Task setAddDate(LocalDateTime addDate) {
        this.addDate = addDate;
        return this;
    }

    public LocalDateTime getLastChangeDate() {
        return lastChangeDate;
    }

    public Task setLastChangeDate(LocalDateTime lastChangeDate) {
        this.lastChangeDate = lastChangeDate;
        return this;
    }

    public String getVideoReview() {
        return videoReview;
    }

    public Task setVideoReview(String videoReview) {
        this.videoReview = videoReview;
        return this;
    }

    public String getSolution() {
        return solution;
    }

    public Task setSolution(String solution) {
        this.solution = solution;
        return this;
    }
}
