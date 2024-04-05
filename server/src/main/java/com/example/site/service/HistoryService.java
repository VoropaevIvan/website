package com.example.site.service;

import com.example.site.dto.SolvedVariant;
import com.example.site.dto.rest.SolvedVariantReply;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Validated
public class HistoryService {
    private final VariantSolutionService variantSolutionService;

    public HistoryService(VariantSolutionService variantSolutionService) {
        this.variantSolutionService = variantSolutionService;
    }

    public List<SolvedVariantReply> getAllVariants(@NotNull Long userId) {
        List<SolvedVariant> solvedVariants = variantSolutionService.getAll(userId);

        Map<Long, SolvedVariant> bestSolutions = new HashMap<>();

        for (SolvedVariant variant : solvedVariants) {
            long id = variant.getVariant().getId();

            bestSolutions.compute(id, (k, v) -> {
                if (
                        v == null ||
                        variant.getPrimaryScore() > v.getPrimaryScore() ||
                        (variant.getPrimaryScore().equals(v.getPrimaryScore()) &&
                         variant.getInstant().isBefore(v.getInstant()))
                ) {
                    return variant;
                }
                return v;
            });
        }

        return bestSolutions.values()
                .stream().map(SolvedVariantReply::from)
                .toList();
    }

    public SolvedVariantReply getVariant(
            @NotNull Long userId,
            @NotBlank String name,
            @NotBlank String type
    ) {
        SolvedVariant solvedVariant;
        switch (type) {
            case "best" -> solvedVariant = variantSolutionService.getBest(userId, name);
            case "first" -> solvedVariant = variantSolutionService.getFirst(userId, name);
            case "last" -> solvedVariant = variantSolutionService.getLast(userId, name);
            default -> throw new RuntimeException("Unknown type of requested variant");
        }

        return SolvedVariantReply.from(solvedVariant);
    }
}
