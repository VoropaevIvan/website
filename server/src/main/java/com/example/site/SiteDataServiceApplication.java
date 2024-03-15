package com.example.site;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SiteDataServiceApplication {
	public static final Logger appLogger = LoggerFactory.getLogger("AppLogger");
	public static void main(String[] args) {
		SpringApplication.run(SiteDataServiceApplication.class, args);
	}

}
