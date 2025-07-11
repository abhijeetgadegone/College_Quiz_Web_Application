package com.quiz.web.dto;

import java.util.List;

import lombok.Data;

@Data
public class TestDetailsDTO {
	
	private TestDTO testDTO;
	
	private List<QuestionDTO> questions;
	
	private long time; 

	public TestDTO getTestDTO() {
		return testDTO;
	}

	public void setTestDTO(TestDTO testDTO) {
		this.testDTO = testDTO;
	}

	public List<QuestionDTO> getQuestions() {
	    return questions;
	}

	public void setQuestions(List<QuestionDTO> questions) 
	{
	    this.questions = questions;
	}
	
	 public long getTime() {
	        return time;
	    }

	    public void setTime(int long1) {
	        this.time = long1;
	    }

}
