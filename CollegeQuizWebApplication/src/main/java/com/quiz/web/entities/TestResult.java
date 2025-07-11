package com.quiz.web.entities;

import com.quiz.web.dto.TestResultDTO;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Mapping user
    private User user;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false) // Mapping test
    private Test test;

    private int totalQuestions;
    private int correctAnswer;
    private double percentage;
    
    
    
    
    
    
    

    public Long getId() {
		return id;
	}








	public void setId(Long id) {
		this.id = id;
	}








	public User getUser() {
		return user;
	}








	public void setUser(User user) {
		this.user = user;
	}








	public Test getTest() {
		return test;
	}








	public void setTest(Test test) {
		this.test = test;
	}








	public int getTotalQuestions() {
		return totalQuestions;
	}








	public void setTotalQuestions(int totalQuestions) {
		this.totalQuestions = totalQuestions;
	}








	public int getCorrectAnswer() {
		return correctAnswer;
	}








	public void setCorrectAnswer(int correctAnswer) {
		this.correctAnswer = correctAnswer;
	}








	public double getPercentage() {
		return percentage;
	}



	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}


	public TestResultDTO getDto() {
        TestResultDTO dto = new TestResultDTO();
        dto.setId(id);
        dto.setTotalQuestions(totalQuestions);
        dto.setCorrectAnswer(correctAnswer);
        dto.setPercentage(percentage);
        dto.setTestName(test.getTitle()); // Use only 'test'
        dto.setUserName(user.getName());  // Use only 'user'
        return dto;
    }








	public String getSelectedAnswerForQuestion(Long id2) {
		// TODO Auto-generated method stub
		return null;
	}
}
