package com.example.site.controller;

import com.example.site.dto.rest.VariantRest;
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
    public ResponseEntity<VariantRest> get(@PathVariable String name) {
        return variantService.get(name)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<String> getAllNames() {
        return variantService.getAllNames();
    }

    @PostMapping("/{name}")
    public VariantRest post(@PathVariable String name, @RequestBody VariantRest variant) {
        return variantService.post(name, variant);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name) {
        if (variantService.delete(name)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
