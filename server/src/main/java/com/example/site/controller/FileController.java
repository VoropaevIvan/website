package com.example.site.controller;

import com.example.site.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/files")
public class FileController {

    @Autowired
    private StorageService storageService;

    @PostMapping
    public Object uploadFile(@RequestParam MultipartFile file) {
        Path filename = storageService.store(file);
        String uri = FileController.resolveFileUri(filename);
        return Map.of("location", uri);
    }

    private static String resolveFileUri(Path file) {
        return MvcUriComponentsBuilder.fromMethodName(
                FileController.class,
                "getFile",
                file.getFileName().toString()
        ).build().toUriString();
    }

    @GetMapping
    public List<String> getFilenames() {
        return storageService.loadAll()
                .stream().map(FileController::resolveFileUri)
                .toList();
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().header(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\""
        ).body(file);
    }
}
