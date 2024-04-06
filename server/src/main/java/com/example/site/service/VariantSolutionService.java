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
import java.util.Optional;

@Service
@Validated
public class VariantSolutionService {
    private final VariantService variantService;
    private final SolvedVariantRepository solvedVariantRepository;
    private final SolvedVariantVerdictRepository solvedVariantVerdictRepository;

    public VariantSolutionService(
            VariantService variantService,
            SolvedVariantRepository solvedVariantRepository,
            SolvedVariantVerdictRepository solvedVariantVerdictRepository
    ) {
        this.variantService = variantService;
        this.solvedVariantRepository = solvedVariantRepository;
        this.solvedVariantVerdictRepository = solvedVariantVerdictRepository;
    }

    @Transactional
    public void solve(@NotNull User user, @Valid SolvedVariantSubmission submission) {
        Variant variant = variantService.getByName(submission.variantName());

        SolvedVariant solvedVariant = new SolvedVariant(user, variant);
        submission.transferTo(solvedVariant);

        solvedVariant = solvedVariantRepository.save(solvedVariant);

        List<Answer> rightAnswers = variant.getTasks().stream()
                .map(VariantTask::getTask)
                .map(Task::getAnswer).toList();

        for (int i = 0; i < rightAnswers.size(); i++) {
            Answer userAnswer = null;
            int scores = 0;
            Optional<Verdict> verdict = Optional.ofNullable(submission.verdicts().get(i));

            if (verdict.isPresent()) {
                userAnswer = verdict.get().userAnswer();
                scores = verdict.get().scores();
            }

            Verdict fullVerdict = new Verdict(userAnswer, rightAnswers.get(i), scores);

            SolvedVariantVerdict answer = new SolvedVariantVerdict(
                    solvedVariant, i, fullVerdict);

            solvedVariantVerdictRepository.save(answer);
        }
    }

    public List<SolvedVariant> getAll(@NotNull User user) {
        return solvedVariantRepository.findAllByUser(user);
    }

    public SolvedVariant getBest(@NotNull User user, @NotBlank String variantName) {
        Variant variant = variantService.getByName(variantName);
        return solvedVariantRepository
                .findFirstByUserAndVariantOrderByPrimaryScoreDescInstantAsc(user, variant)
                .orElseThrow(() -> noVariantExc(user, variantName));
    }

    public SolvedVariant getLast(@NotNull User user, @NotBlank String variantName) {
        Variant variant = variantService.getByName(variantName);
        return solvedVariantRepository
                .findFirstByUserAndVariantOrderByInstantDesc(user, variant)
                .orElseThrow(() -> noVariantExc(user, variantName));
    }

    public SolvedVariant getFirst(@NotNull User user, @NotBlank String variantName) {
        Variant variant = variantService.getByName(variantName);

        return solvedVariantRepository
                .findFirstByUserAndVariantOrderByInstantAsc(user, variant)
                .orElseThrow(() -> noVariantExc(user, variantName));
    }

    private RuntimeException noVariantExc(User user, String variantName) {
         return new RuntimeException(
                 "No solved variant(userId=" + user.getId() + ",variantName=" + variantName + ")");
    }
}
