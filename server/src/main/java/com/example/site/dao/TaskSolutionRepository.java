package com.example.site.dao;

import com.example.site.dto.TaskSolution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskSolutionRepository extends JpaRepository<TaskSolution, Long> {
}
