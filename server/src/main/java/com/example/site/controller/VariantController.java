package com.example.site.controller;

import com.example.site.dto.Task;
import com.example.site.service.VariantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("variants")
public class VariantController {
    private final VariantService variantService;

    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @GetMapping("/{variantName}")
    public ResponseEntity<List<Task>> postVariant(@PathVariable String variantName) {
        return variantService.get(variantName)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{variantName}")
    public List<Task> postVariant(@PathVariable String variantName, @RequestBody List<Task> tasks) {
        return variantService.post(variantName, tasks);
    }
}
