package com.example.site.service;

import com.example.site.dao.SolvedVariantRepository;
import com.example.site.dao.SolvedVariantVerdictRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedVariantSubmission;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class VariantSolutionService {
    private final UserService userService;
    private final VariantService variantService;
    private final SolvedVariantRepository solvedVariantRepository;
    private final SolvedVariantVerdictRepository solvedVariantVerdictRepository;

    public VariantSolutionService(
            UserService userService,
            VariantService variantService,
            SolvedVariantRepository solvedVariantRepository,
            SolvedVariantVerdictRepository solvedVariantVerdictRepository
    ) {
        this.userService = userService;
        this.variantService = variantService;
        this.solvedVariantRepository = solvedVariantRepository;
        this.solvedVariantVerdictRepository = solvedVariantVerdictRepository;
    }

    @Transactional
    public void solve(@NotNull Long userId, @Valid SolvedVariantSubmission submission) {
        User user = userService.getById(userId);
        Variant variant = variantService.getByName(submission.variantName());

        SolvedVariant solvedVariant = solvedVariantRepository.save(new SolvedVariant(user, variant));

        for (var entry : submission.verdicts().entrySet()) {
            SolvedVariantVerdict answer = new SolvedVariantVerdict(
                    solvedVariant,
                    entry.getKey(),
                    entry.getValue());
            solvedVariantVerdictRepository.save(answer);
        }
    }
}
