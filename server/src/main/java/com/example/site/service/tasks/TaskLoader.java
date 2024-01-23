package com.example.site.service.tasks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Configuration
public class TaskLoader {
    @Bean
    @Profile("init")
    CommandLineRunner init(TaskRepository repository) {
        return args -> {
            repository.save(new Task()
                    .setNumber(3)
                    .setDescription("1 + 1 = ?")
                    .setFiles("")
                    .setAnswer("2")
                    .setLevel("easy")
                    .setOfficial(false)
                    .setRelevant(true)
                    .setDateOfAdd(Timestamp.valueOf(
                            LocalDateTime.of(2024, 1, 23, 12, 0, 0)))
                    .setTopic("A sum of two numbers")
                    .setSource("https://random.com/task/1")
                    .setVideoReview("https://youtube.com/"));

            repository.save(new Task()
                    .setNumber(3)
                    .setDescription("2 + 1 = ?")
                    .setFiles("")
                    .setAnswer("3")
                    .setLevel("normal")
                    .setOfficial(false)
                    .setRelevant(true)
                    .setDateOfAdd(Timestamp.valueOf(
                            LocalDateTime.of(2024, 1, 23, 12, 0, 30)))
                    .setTopic("A sum of two numbers")
                    .setSource("https://random.com/task/2")
                    .setVideoReview("https://youtube.com/"));
        };
    }
}
