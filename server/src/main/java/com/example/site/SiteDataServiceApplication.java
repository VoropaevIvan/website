package com.example.site;

import com.example.site.service.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SiteDataServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(SiteDataServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner initStorageLocation(StorageService storageService) {
		return args -> storageService.init();
	}
}
