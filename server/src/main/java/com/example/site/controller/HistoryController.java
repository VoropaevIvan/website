package com.example.site.controller;

import com.example.site.dto.User;
import com.example.site.dto.rest.SolvedVariantReply;
import com.example.site.service.HistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/history")
public class HistoryController {
    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/variants")
    public List<SolvedVariantReply> getAllVariants(@RequestAttribute(User.ID_ATTR) Long userId) {
        return historyService.getAllVariants(userId);
    }

    @GetMapping("/variants/{name}")
    public SolvedVariantReply getVariant(
            @RequestAttribute(User.ID_ATTR) Long userId,
            @PathVariable("name") String name,
            @RequestParam("type") String type
    ) {
        return historyService.getVariant(userId, name, type);
    }
}
