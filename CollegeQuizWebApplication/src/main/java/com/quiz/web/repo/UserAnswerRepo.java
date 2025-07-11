//package com.quiz.web.repo;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import com.quiz.web.entities.UserAnswer;
//
//import java.util.List;
//
//public interface UserAnswerRepo extends JpaRepository<UserAnswer, Long> {
//	
//	
//	@Query("SELECT ua FROM UserAnswer ua WHERE ua.user.id = :userId AND ua.test.id = :testId")
//    List<UserAnswer> findByUserIdAndTestId(Long userId, Long testId);
//}
