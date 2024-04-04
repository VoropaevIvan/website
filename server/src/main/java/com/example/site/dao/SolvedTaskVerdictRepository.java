package com.example.site.dao;

import com.example.site.dto.SolvedTaskVerdict;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedTaskVerdictRepository extends JpaRepository<SolvedTaskVerdict, Long> {
}
