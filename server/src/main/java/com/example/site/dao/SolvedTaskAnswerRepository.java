package com.example.site.dao;

import com.example.site.dto.SolvedTaskAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedTaskAnswerRepository extends JpaRepository<SolvedTaskAnswer, Long> {
}
