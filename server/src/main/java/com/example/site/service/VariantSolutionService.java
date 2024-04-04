package com.example.site.service;

import com.example.site.dao.SolvedVariantRepository;
import com.example.site.dao.SolvedVariantVerdictRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedVariantSubmission;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

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

        SolvedVariant solvedVariant = new SolvedVariant(user, variant, submission.primaryScore());
        solvedVariant.setExam(submission.exam());
        solvedVariant.setFinalScore(submission.finalScore());

        solvedVariant = solvedVariantRepository.save(solvedVariant);

        for (var entry : submission.verdicts().entrySet()) {
            SolvedVariantVerdict answer = new SolvedVariantVerdict(
                    solvedVariant,
                    entry.getKey(),
                    entry.getValue());
            solvedVariantVerdictRepository.save(answer);
        }
    }

    public List<SolvedVariant> getAll(@NotNull Long userId) {
        User user = userService.getById(userId);
        return solvedVariantRepository.findAllByUser(user);
    }

    public SolvedVariant getBest(@NotNull Long userId, @NotBlank String variantName) {
        User user = userService.getById(userId);
        Variant variant = variantService.getByName(variantName);

        return solvedVariantRepository
                .findFirstByUserAndVariantOrderByScoreDescInstantAsc(user, variant)
                .orElseThrow(() -> noVariantExc(userId, variantName));
    }

    public SolvedVariant getLast(@NotNull Long userId, @NotBlank String variantName) {
        User user = userService.getById(userId);
        Variant variant = variantService.getByName(variantName);

        return solvedVariantRepository
                .findFirstByUserAndVariantOrderByInstantDesc(user, variant)
                .orElseThrow(() -> noVariantExc(userId, variantName));
    }

    private RuntimeException noVariantExc(long userId, String variantName) {
         return new RuntimeException(
                 "No solved variant(userId=" + userId + ",variantName=" + variantName + ")");
    }
}
