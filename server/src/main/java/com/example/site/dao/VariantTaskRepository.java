package com.example.site.dao;

import com.example.site.model.VariantTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VariantTaskRepository extends JpaRepository<VariantTask, Long> {
}
