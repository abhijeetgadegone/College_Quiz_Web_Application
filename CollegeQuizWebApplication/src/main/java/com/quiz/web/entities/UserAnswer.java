//package com.quiz.web.entities;
//
//
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//public class UserAnswer {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "question_id", nullable = false)
//    private Question question;
//
//    @ManyToOne
//    @JoinColumn(name = "test_id", nullable = false)
//    private Test test;
//
//    @Column(nullable = false)
//    private String selectedOption;
//
//    @ManyToOne
//    @JoinColumn(name = "test_result_id")
//    private TestResult testResult;  // to associate with the result
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//
//	public Question getQuestion() {
//		return question;
//	}
//
//	public void setQuestion(Question question) {
//		this.question = question;
//	}
//
//	public Test getTest() {
//		return test;
//	}
//
//	public void setTest(Test test) {
//		this.test = test;
//	}
//
//	public String getSelectedOption() {
//		return selectedOption;
//	}
//
//	public void setSelectedOption(String selectedOption) {
//		this.selectedOption = selectedOption;
//	}
//
//	public TestResult getTestResult() {
//		return testResult;
//	}
//
//	public void setTestResult(TestResult testResult) {
//		this.testResult = testResult;
//	}
//
// 
//}
