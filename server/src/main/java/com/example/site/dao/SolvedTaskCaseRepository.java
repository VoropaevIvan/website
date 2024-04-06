package com.example.site.dao;

import com.example.site.dto.SolvedTaskCase;
import com.example.site.dto.Task;
import com.example.site.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SolvedTaskCaseRepository extends JpaRepository<SolvedTaskCase, Long> {
    Optional<SolvedTaskCase> findByUserAndTask(User user, Task task);

    List<SolvedTaskCase> findAllByUser(User user);
}
