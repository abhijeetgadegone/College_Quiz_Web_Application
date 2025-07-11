package com.quiz.web.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quiz.web.entities.Test;
import com.quiz.web.entities.TestResult;

@Repository
public interface TestRepo extends JpaRepository<Test, Long>
{
    List<Test> findByPublishedTrue();
    List<TestResult> findByUserId(Long userId);

}

	

