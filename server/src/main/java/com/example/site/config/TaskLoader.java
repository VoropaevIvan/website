package com.example.site.config;

import com.example.site.SiteDataServiceApplication;
import com.example.site.dao.TaskRepository;
import com.example.site.dto.Task;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

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
                        .setIsOfficial(false)
                        .setActuality("d")
                        .setDifficulty("f")
                        .setSource("sdf")
                        .setTopic(23)
                        .setFiles("sdf")
                        .setVideoReview("sdf")
                        .setSolution("sdf")
                );
            }
            SiteDataServiceApplication.appLogger.info("Add " + num + " tasks");
        };
    }
}
