package com.example.site.service;

import com.example.site.dao.SolvedVariantRepository;
import com.example.site.dao.SolvedVariantAnswerRepository;
import com.example.site.dto.*;
import com.example.site.dto.rest.SolvedVariantSubmission;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

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
    public void solve(@Valid SolvedVariantSubmission submission) {
        long userId = submission.userId();
        Optional<User> optUser = userService.findUser(userId);
        if (optUser.isEmpty()) {
            throw new RuntimeException("User(id=" + userId + ") doesn't exist");
        }

        String variantName = submission.variantName();
        Optional<Variant> optVariant = variantService.findByName(variantName);
        if (optVariant.isEmpty()) {
            throw new RuntimeException("Variant(name=" + variantName + ") doesn't exist");
        }

        SolvedVariant solvedVariant = solvedVariantRepository.save(
                new SolvedVariant(optUser.get(), optVariant.get()));

        List<Answer> answers = submission.answers();
        for (int i = 0; i < answers.size(); i++) {
            SolvedVariantAnswer answer = new SolvedVariantAnswer(
                    solvedVariant, i, answers.get(i));
            solvedVariantAnswerRepository.save(answer);
        }
    }
}
