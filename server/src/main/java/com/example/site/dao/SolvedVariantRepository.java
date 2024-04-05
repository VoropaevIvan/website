package com.example.site.dao;

import com.example.site.dto.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SolvedVariantRepository extends JpaRepository<SolvedVariant, Long> {
    List<SolvedVariant> findAllByUser(User user);

    Optional<SolvedVariant> findFirstByUserAndVariantOrderByPrimaryScoreDescInstantAsc(User user, Variant variant);

    Optional<SolvedVariant> findFirstByUserAndVariantOrderByInstantDesc(User user, Variant variant);

    Optional<SolvedVariant> findFirstByUserAndVariantOrderByInstantAsc(User user, Variant variant);
}
