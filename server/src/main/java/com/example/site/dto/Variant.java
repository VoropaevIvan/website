package com.example.site.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.NaturalId;

import java.util.List;

@Entity
public class Variant {

    @Id
    @GeneratedValue
    private long id;

    @NaturalId
    @Basic(optional = false)
    private String name;

    @OneToMany(mappedBy = "variant")
    private List<VariantTask> tasks;

    @Basic(optional = false)
    private Integer maxScore;

    public Variant() {
    }

    public Variant(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<VariantTask> getTasks() {
        return tasks;
    }

    public void setTasks(List<VariantTask> tasks) {
        this.tasks = tasks;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof Variant other &&
               this.name.equals(other.name);
    }
}
