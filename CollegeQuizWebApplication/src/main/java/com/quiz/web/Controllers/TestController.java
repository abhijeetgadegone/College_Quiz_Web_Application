package com.quiz.web.Controllers;

import com.quiz.web.dto.*;
import com.quiz.web.entities.Question;
import com.quiz.web.entities.TestResult;
import com.quiz.web.repo.Questionrepo;
import com.quiz.web.services.test.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestService testService;
    
    @Autowired
    private Questionrepo questionRepo;

    @PostMapping("/create")
    public TestDTO createTest(@RequestBody TestDTO testDTO) {
        System.out.println("Creating test: " + testDTO.getTitle());
        return testService.createTest(testDTO);
    }

    @PostMapping("/addQuestion")
    public QuestionDTO addQuestionToTest(@RequestBody QuestionDTO questionDTO) {
        return testService.addQuestionTest(questionDTO);
    }

    @GetMapping
    public List<TestDTO> getAllTests() {
        return testService.getAllTests();
    }

    @GetMapping("/questions/{id}")
    public TestDetailsDTO getAllQuestionsByTest(@PathVariable Long id) {
        return testService.getAllQuestionByTest(id);
    }

    @PostMapping("/submitTest")
    public TestResultDTO submitTest(@RequestBody SubmitDTO submitDTO) {
        return testService.submitTest(submitDTO);
    }

    @GetMapping("/results")
    public List<TestResultDTO> getAllTestResults() {
        return testService.getAllTestResults();
    }
    
    
    @GetMapping("/results/{userId}")
    public ResponseEntity<List<TestResultDTO>> getResultsByUserId(@PathVariable Long userId) {
        List<TestResultDTO> results = testService.getTestResultsForUser(userId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/published")
    public List<TestDTO> getAllPublishedTests() {
        return testService.getAllPublishedTests();
    }

    @DeleteMapping("/{id}")
    public boolean deleteTest(@PathVariable Long id) {
        return testService.deleteTestById(id);
    }

    @PatchMapping("/toggle-publish/{id}")
    public void togglePublishStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        boolean publish = body.get("published");
        testService.togglePublish(id, publish);
    }
    
    @PutMapping("/questions/{questionId}")
    public ResponseEntity<String> updateQuestion(@PathVariable Long questionId, @RequestBody Question updatedQuestion) {
        Question existingQuestion = questionRepo.findById(questionId)
            .orElseThrow(() -> new RuntimeException("Question not found"));

        existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
        existingQuestion.setOption1(updatedQuestion.getOption1());
        existingQuestion.setOption2(updatedQuestion.getOption2());
        existingQuestion.setOption3(updatedQuestion.getOption3());
        existingQuestion.setOption4(updatedQuestion.getOption4());
        existingQuestion.setCorrectOption(updatedQuestion.getCorrectOption());

        questionRepo.save(existingQuestion);

        return ResponseEntity.ok("Question updated successfully");
    }

    @GetMapping("/result-details/{userId}/{testId}")
    public ResponseEntity<TestResultDTO> getDetailedTestResult(
            @PathVariable Long userId,
            @PathVariable Long testId) {
        TestResultDTO result = testService.getDetailedTestResultForUser(userId, testId);
        return ResponseEntity.ok(result);
    }

    


}
