package com.quiz.web.services.test;

import java.util.List;
import com.quiz.web.dto.*;
import com.quiz.web.entities.Question;
import com.quiz.web.entities.TestResult;

import jakarta.transaction.Transactional;

public interface TestService {

    // Test creation and question addition
    TestDTO createTest(TestDTO dto);
    QuestionDTO addQuestionTest(QuestionDTO dto);

    // Retrieve all tests and test details
    List<TestDTO> getAllTests();
    TestDetailsDTO getAllQuestionByTest(Long id);

   
    TestResultDTO submitTest(SubmitDTO request);
    List<TestResultDTO> getAllTestResults();
   

    boolean deleteTestById(Long id);
    
    boolean hasUserSubmittedTest(Long userId, Long testId);

  
    boolean updateTestPublishStatus(Long testId, boolean publish);
    
    void togglePublish(Long id, boolean published);
    List<TestDTO> getAllPublishedTests();


    List<TestResultDTO> getTestResultsForUser(Long userId);
    
	Question updateQuestion(Long id, Question updatedQuestion);
	TestResultDTO getDetailedTestResultForUser(Long userId, Long testId);
	 

}
