package com.quiz.web.dto;

import java.util.List;

public class SubmitDTO {
    private Long testId;
    private Long userId;
    private List<QuestionResponse> responses;

    
    public SubmitDTO() {}

    
    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<QuestionResponse> getResponses() {
        return responses;
    }

    public void setResponses(List<QuestionResponse> responses) {
        this.responses = responses;
    }
}
