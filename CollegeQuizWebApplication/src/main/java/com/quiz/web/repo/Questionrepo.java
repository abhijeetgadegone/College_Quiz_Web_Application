package com.quiz.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quiz.web.entities.Question;

import jakarta.transaction.Transactional;

@Repository
public interface Questionrepo extends JpaRepository<Question, Long>
{
	@Transactional
    void deleteByTestId(Long testId);
	
	  @Transactional
	    void deleteAllByTestId(Long testId);
}

