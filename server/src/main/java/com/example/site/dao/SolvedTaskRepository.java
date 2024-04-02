package com.example.site.dao;

import com.example.site.dto.SolvedTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedTaskRepository extends JpaRepository<SolvedTask, Long> {
}
