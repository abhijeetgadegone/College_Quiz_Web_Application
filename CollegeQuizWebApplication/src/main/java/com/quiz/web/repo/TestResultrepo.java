package com.quiz.web.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quiz.web.entities.Test;
import com.quiz.web.entities.TestResult;
import com.quiz.web.entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface TestResultrepo  extends JpaRepository<TestResult, Long>{

	List<TestResult> findByUserId(Long userId);

	
	 @Transactional
	    void deleteByTestId(Long testId);
	 
	  @Transactional
	    void deleteAllByTestId(Long testId);

	  boolean existsByUser_IdAndTest_Id(Long userId, Long testId);
	  
	  @Query("SELECT tr.test.id FROM TestResult tr WHERE tr.user.id = :userId")
	    List<Long> findTestIdsByUserId(@Param("userId") Long userId);


	Optional<User> findByUserAndTest(User user, Test test);


	Optional<TestResult> findByUserIdAndTestId(Long userId, Long testId);



	

	
	



	
	
}
