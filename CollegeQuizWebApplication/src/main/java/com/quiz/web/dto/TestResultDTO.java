package com.quiz.web.dto;

import java.util.List;

import lombok.Data;

@Data
public class TestResultDTO {

	
	private Long id;
	
	private int totalQuestions;
	
	
	private int correctAnswer;
	
	private double percentage;
	
	
	private String testName;
	
	private String userName;
	 private List<QuestionResultDTO> questionResults;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<QuestionResultDTO> getQuestionResults() {
		return questionResults;
	}

	public void setQuestionResults(List<QuestionResultDTO> questionResults) {
		this.questionResults = questionResults;
	}
	
	
	
}
