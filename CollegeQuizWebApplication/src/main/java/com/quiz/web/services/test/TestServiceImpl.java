package com.quiz.web.services.test;

import java.util.ArrayList;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.quiz.web.dto.*;
import com.quiz.web.entities.*;
import com.quiz.web.repo.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepo testRepo;

    @Autowired
    private Questionrepo questionRepo;

    @Autowired
    private TestResultrepo testResultRepo;

    @Autowired
    private UserRepo userRepo;

    
//    @Autowired
//    private UserAnswerRepo userAnswerRepo;

   

    @Override
    @Transactional
    public TestDTO createTest(TestDTO dto) {
    	

        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime());
        test.setPublished(dto.isPublished());

       
        testRepo.save(test);

        return test.getDto();
    }




    @Override
    public QuestionDTO addQuestionTest(QuestionDTO dto) {
        Test test = testRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        Question question = new Question();
        question.setTest(test);
        question.setQuestionText(dto.getQuestionText());
        question.setOption1(dto.getOption1());
        question.setOption2(dto.getOption2());
        question.setOption3(dto.getOption3());
        question.setOption4(dto.getOption4());
        question.setCorrectOption(dto.getCorrectOption());

        return questionRepo.save(question).getDto();
    }

    @Override
    public List<TestDTO> getAllTests()
    {
        return testRepo.findAll().stream()
                .map(Test::getDto)
                .collect(Collectors.toList());
    }

    @Override
    public TestDetailsDTO getAllQuestionByTest(Long id) {
        Test test = testRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        TestDetailsDTO testDetailsDTO = new TestDetailsDTO();
        testDetailsDTO.setTestDTO(test.getDto());
        testDetailsDTO.setQuestions(
                test.getQuestions().stream().map(Question::getDto).collect(Collectors.toList())
        );

        if (testDetailsDTO.getTestDTO().getTime() == 0) {
            System.out.println("⚠ Warning: Test time is 0 in DTO!");
        }

        return testDetailsDTO;
    }
    
    @Override
    public TestResultDTO submitTest(SubmitDTO request) {
        if (hasUserSubmittedTest(request.getUserId(), request.getTestId())) {
            throw new RuntimeException("You have already submitted this test!");
        }

        Test test = testRepo.findById(request.getTestId())
            .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        User user = userRepo.findById(request.getUserId())
            .orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        int totalQuestions = test.getQuestions() != null ? test.getQuestions().size() : 0;
        if (totalQuestions == 0) {
            throw new IllegalArgumentException("Total questions cannot be zero.");
        }

        int correctAnswer = 0;
        
        List<QuestionResultDTO> questionResults = new ArrayList<>();

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResultRepo.save(testResult);  // Save early to use FK in UserAnswer

        if (request.getResponses() != null) {
            for (QuestionResponse response : request.getResponses()) {
                Question question = questionRepo.findById(response.getQuestionId())
                    .orElseThrow(() -> new EntityNotFoundException("Question Not Found"));

                if (question.getCorrectOption().equalsIgnoreCase(response.getSelectedOption())) {
                    correctAnswer++;
                }

               
//                UserAnswer ua = new UserAnswer();
//                ua.setUser(user);
//                ua.setTest(test);
//                ua.setQuestion(question);
//                ua.setSelectedOption(response.getSelectedOption());
//                ua.setTestResult(testResult);  // associate with result
//                UserAnswer saved = userAnswerRepo.save(ua);
//                


               
                QuestionResultDTO resultDTO = new QuestionResultDTO();
                resultDTO.setQuestionId(question.getId());
                resultDTO.setQuestionText(question.getQuestionText());
                resultDTO.setSelectedOption(response.getSelectedOption());
                resultDTO.setCorrectOption(question.getCorrectOption());
                questionResults.add(resultDTO);
                
               
            }
        }

        double percentage = ((double) correctAnswer / totalQuestions) * 100;

        
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswer(correctAnswer);
        testResult.setPercentage(percentage);
        testResultRepo.save(testResult);  

        
        TestResultDTO resultDTO = new TestResultDTO();
        resultDTO.setId(testResult.getId());
        resultDTO.setTotalQuestions(totalQuestions);
        resultDTO.setCorrectAnswer(correctAnswer);
        resultDTO.setPercentage(percentage);
        resultDTO.setTestName(test.getTitle());
        resultDTO.setUserName(user.getName());
        resultDTO.setQuestionResults(questionResults);

        return resultDTO;
    }


    @Override
    public List<TestResultDTO> getAllTestResults() {
        return testResultRepo.findAll().stream().map(TestResult::getDto).collect(Collectors.toList());
    }

    


    @Override
    @Transactional
    public boolean deleteTestById(Long id) {
        if (!testRepo.existsById(id)) {
            return false;
        }

        try {
            testResultRepo.deleteAllByTestId(id);
            questionRepo.deleteAllByTestId(id);
            testRepo.deleteById(id);

            return true;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete test. Possible foreign key constraints.", e);
        }
    }

    @Override
    public boolean hasUserSubmittedTest(Long userId, Long testId) {
        return testResultRepo.existsByUser_IdAndTest_Id(userId, testId);
    }

    @Override
    public boolean updateTestPublishStatus(Long testId, boolean publish) {
        Optional<Test> optionalTest = testRepo.findById(testId);
        if (optionalTest.isPresent()) {
            Test test = optionalTest.get();
            test.setPublished(publish);
            testRepo.save(test);
            return true;
        }
        return false;
    }

    @Override
    public void togglePublish(Long id, boolean published) {
        Test test = testRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        test.setPublished(published);
        testRepo.save(test);
    }

    @Override
    public List<TestDTO> getAllPublishedTests() {
        return testRepo.findByPublishedTrue().stream()
                .map(Test::getDto)
                .collect(Collectors.toList());
    }

   

    @Override
    public List<TestResultDTO> getTestResultsForUser(Long userId) {
        List<TestResult> results = testResultRepo.findByUserId(userId);

        return results.stream().map(result -> {
            TestResultDTO dto = new TestResultDTO();
            dto.setId(result.getId());
            dto.setTotalQuestions(result.getTotalQuestions());
            dto.setCorrectAnswer(result.getCorrectAnswer());
            dto.setPercentage(result.getPercentage());
            dto.setTestName(result.getTest().getTitle());
            dto.setUserName(result.getUser().getName());
            return dto;
        }).collect(Collectors.toList());
    }
    
    @Override
    public Question updateQuestion(Long id, Question updatedQuestion) {
        Question existing = questionRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found"));

        existing.setQuestionText(updatedQuestion.getQuestionText());
        existing.setOption1(updatedQuestion.getOption1());
        existing.setOption2(updatedQuestion.getOption2());
        existing.setOption3(updatedQuestion.getOption3());
        existing.setOption4(updatedQuestion.getOption4());
        existing.setCorrectOption(updatedQuestion.getCorrectOption());

        return questionRepo.save(existing);
    }

    @Override
    public TestResultDTO getDetailedTestResultForUser(Long userId, Long testId) 
    {
        TestResult result = testResultRepo.findByUserIdAndTestId(userId, testId)
                .orElseThrow(() -> new RuntimeException("Result not found"));

//        List<UserAnswer> answers = userAnswerRepo.findByUserIdAndTestId(userId, testId);

//        List<QuestionResultDTO> questionResults = answers.stream().map(answer -> {
//            Question question = answer.getQuestion();
//            QuestionResultDTO qDto = new QuestionResultDTO();
//            qDto.setQuestionId(question.getId());
//            qDto.setQuestionText(question.getQuestionText());
//            qDto.setCorrectOption(question.getCorrectOption());
//            qDto.setSelectedOption(answer.getSelectedOption());
//            return qDto;
//        }).collect(Collectors.toList());

        TestResultDTO dto = new TestResultDTO();
        dto.setId(result.getId());
        dto.setTestName(result.getTest().getTitle());
        dto.setUserName(result.getUser().getName());
        dto.setTotalQuestions(result.getTotalQuestions());
        dto.setCorrectAnswer(result.getCorrectAnswer());
        dto.setPercentage(result.getPercentage());
//        dto.setQuestionResults(questionResults);

        return dto;
    }
}
