package com.example.site.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class StorageService {
    private final Path rootLocation;

    public StorageService(@Value("${files.location}") String rootLocation) {
        if (rootLocation.trim().isEmpty()) {
            throw new RuntimeException("File upload location can not be Empty.");
        }
        this.rootLocation = Path.of(rootLocation);
    }

    public Path store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }
            String fileExtension = file.getOriginalFilename().split("\\.", 2)[1];
            UUID randomUUID = UUID.randomUUID();
            Path destinationFile = this.rootLocation
                    .resolve(Path.of(randomUUID + "." + fileExtension))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new RuntimeException("Cannot store file outside current directory.");
            }
            if (Files.exists(destinationFile)) {
                throw new RuntimeException(
                        "Unsuccessful attempt to generate filename " +
                        "because a such filename has already existed: " +
                        destinationFile.getFileName()
                );
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return destinationFile.getFileName();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }

    public List<Path> loadAll() {
        try (Stream<Path> files = Files.walk(this.rootLocation, 1)) {
            return files.filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize).toList();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read stored files", e);
        }
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists() && !resource.isReadable()) {
                throw new RuntimeException("Could not read file: " + filename);
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not read file: " + filename, e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }
}
