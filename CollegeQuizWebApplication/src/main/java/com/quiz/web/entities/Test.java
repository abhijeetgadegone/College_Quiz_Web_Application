package com.quiz.web.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quiz.web.dto.TestDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int time;
    
    @Column(name = "published")
    private boolean published;


    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Question> questions;


    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TestResult> testResults; // ✅ Ensure 'test' exists in TestResult
    
    @ManyToOne
    private User user;

    
    
    

    public Long getId() {
		return id;
	}




	public void setId(Long id) {
		this.id = id;
	}




	public String getTitle() {
		return title;
	}




	public void setTitle(String title) {
		this.title = title;
	}




	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}




	public int getTime() {
		return time;
	}
	

public void setTime(int time) {
		this.time = time;
	}




	public List<Question> getQuestions() {
		return questions;
	}




	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}




	public List<TestResult> getTestResults() {
		return testResults;
	}




	public void setTestResults(List<TestResult> testResults) {
		this.testResults = testResults;
	}

	



	public boolean isPublished() {
	    return published;
	}

	public void setPublished(boolean published) {
	    this.published = published;
	}




	public User getUser() {
		return user;
	}




	public void setUser(User user) {
		this.user = user;
	}




	public TestDTO getDto() {
        TestDTO dto = new TestDTO();
        dto.setId(this.id);
        dto.setTitle(this.title);
        dto.setDescription(this.description);
        dto.setTime(this.time);
        dto.setPublished(this.published);

       

        return dto;
    }




	



	
}
