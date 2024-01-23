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

    @Column(nullable = false)
    private int num;

    @Column(nullable = false, length = MAX_LENGTH)
    private String dsc;

    @Column(nullable = false, length = MAX_LENGTH)
    private String files;

    @Column(nullable = false, length = MAX_LENGTH)
    private String ans;

    @Column(nullable = false)
    private String lvl;

    @Column(nullable = false)
    private boolean isOfficial;

    @Column(nullable = false)
    private boolean isRelevant;

    @Column(nullable = false)
    private Timestamp dateOfAdd;

    private String topic;

    @Column(length = MAX_LENGTH)
    private String src;

    @Column(length = MAX_LENGTH)
    private String videoReview;

    public int getId() {
        return id;
    }

    public Task setId(int id) {
        this.id = id;
        return this;
    }

    public int getNumber() {
        return num;
    }

    public Task setNumber(int num) {
        this.num = num;
        return this;
    }

    public String getDescription() {
        return dsc;
    }

    public Task setDescription(String dsc) {
        this.dsc = dsc;
        return this;
    }

    public String getFiles() {
        return files;
    }

    public Task setFiles(String files) {
        this.files = files;
        return this;
    }

    public String getAnswer() {
        return ans;
    }

    public Task setAnswer(String ans) {
        this.ans = ans;
        return this;
    }

    public String getLevel() {
        return lvl;
    }

    public Task setLevel(String lvl) {
        this.lvl = lvl;
        return this;
    }

    public boolean isOfficial() {
        return isOfficial;
    }

    public Task setOfficial(boolean official) {
        isOfficial = official;
        return this;
    }

    public boolean isRelevant() {
        return isRelevant;
    }

    public Task setRelevant(boolean relevant) {
        isRelevant = relevant;
        return this;
    }

    public Timestamp getDateOfAdd() {
        return dateOfAdd;
    }

    public Task setDateOfAdd(Timestamp dateOfAdd) {
        this.dateOfAdd = dateOfAdd;
        return this;
    }

    public String getTopic() {
        return topic;
    }

    public Task setTopic(String topic) {
        this.topic = topic;
        return this;
    }

    public String getSource() {
        return src;
    }

    public Task setSource(String src) {
        this.src = src;
        return this;
    }

    public String getVideoReview() {
        return videoReview;
    }

    public Task setVideoReview(String videoReview) {
        this.videoReview = videoReview;
        return this;
    }
}
