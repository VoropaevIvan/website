package com.example.site.service.tasks;

import jakarta.persistence.*;

import java.sql.Timestamp;

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
@Entity(name = "tasks")
public class Task {
    private static final int MAX_LENGTH = Integer.MAX_VALUE;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false, length = MAX_LENGTH)
    private String content;

    @Column(nullable = false, length = MAX_LENGTH)
    private String answer;

    @Column(nullable = false)
    private String numberEGE;

    @Column
    private boolean isOfficial;

    @Column
    private String actuality;

    @Column
    private String difficulty;

    @Column(length = MAX_LENGTH)
    private String source;

    @Column
    private int topic;

    @Column(length = MAX_LENGTH)
    private String files;

    @Column
    private Timestamp addDate;

    @Column
    private Timestamp lastChangeDate;

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

    public String getAnswer() {
        return answer;
    }

    public Task setAnswer(String answer) {
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

    public boolean isOfficial() {
        return isOfficial;
    }

    public Task setOfficial(boolean official) {
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

    public Timestamp getAddDate() {
        return addDate;
    }

    public Task setAddDate(Timestamp addDate) {
        this.addDate = addDate;
        return this;
    }

    public Timestamp getLastChangeDate() {
        return lastChangeDate;
    }

    public Task setLastChangeDate(Timestamp lastChangeDate) {
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
