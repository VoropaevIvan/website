package com.example.site.controller;

import com.example.site.dto.rest.TaskRest;
import com.example.site.service.VariantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/variants")
public class VariantController {
    private final VariantService variantService;

    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<TaskRest>> getTasks(@PathVariable String name) {
        return variantService.getTasks(name)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<String> getAllNames() {
        return variantService.getAllNames();
    }

    @PostMapping("/{name}")
    public List<TaskRest> postVariant(@PathVariable String name, @RequestBody List<TaskRest> tasks) {
        return variantService.post(name, tasks);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteVariant(@PathVariable String name) {
        if (variantService.delete(name)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
