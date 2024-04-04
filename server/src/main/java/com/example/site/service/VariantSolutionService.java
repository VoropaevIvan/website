package com.example.site.service;

import com.example.site.dao.SolvedVariantRepository;
import com.example.site.dao.SolvedVariantAnswerRepository;
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
    private final SolvedVariantAnswerRepository solvedVariantAnswerRepository;

    public VariantSolutionService(
            UserService userService,
            VariantService variantService,
            SolvedVariantRepository solvedVariantRepository,
            SolvedVariantAnswerRepository solvedVariantAnswerRepository
    ) {
        this.userService = userService;
        this.variantService = variantService;
        this.solvedVariantRepository = solvedVariantRepository;
        this.solvedVariantAnswerRepository = solvedVariantAnswerRepository;
    }

    @Transactional
    public void solve(@NotNull Long userId, @Valid SolvedVariantSubmission submission) {
        User user = userService.getById(userId);
        Variant variant = variantService.getByName(submission.variantName());

        SolvedVariant solvedVariant = solvedVariantRepository.save(new SolvedVariant(user, variant));

        for (var entry : submission.answers().entrySet()) {
            SolvedVariantAnswer answer = new SolvedVariantAnswer(
                    solvedVariant,
                    entry.getKey(),
                    entry.getValue());
            solvedVariantAnswerRepository.save(answer);
        }
    }
}
