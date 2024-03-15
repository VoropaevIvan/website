package com.example.site.service.tasks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.example.site.service.SiteDataServiceApplication.appLogger;

@Configuration
public class TaskLoader {

//    @Bean
    CommandLineRunner init(TaskRepository repository) {
        return args -> {
            int num = 30;
            for (int i = 0; i < num; i++) {
                repository.save(new Task()
                        .setContent("2 + 1 = ?")
                        .setAnswer(new Task.Answer(0, 0, "3"))
                        .setNumberEGE("6")
                        .setOfficial(false)
                        .setActuality("d")
                        .setDifficulty("f")
                        .setSource("sdf")
                        .setTopic(23)
                        .setFiles("sdf")
                        .setVideoReview("sdf")
                        .setSolution("sdf")
                );
            }
            appLogger.info("Add " + num + " tasks");
        };
    }
}
