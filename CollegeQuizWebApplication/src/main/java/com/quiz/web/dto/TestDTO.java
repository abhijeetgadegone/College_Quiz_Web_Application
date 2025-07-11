package com.quiz.web.dto;

import lombok.Data;

@Data
public class TestDTO {
    
    private long id;
    private String title;
    private String description;
    private int time;
    private boolean published;
    
    
    

   
    
	// ✅ Use Boolean instead of boolean
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
	public void setTime(int time2) {
		this.time = time2;
	}
	
	public boolean isPublished() {
	    return published;
	}

	public void setPublished(boolean published) {
	    this.published = published;
	}
	
	

    
    
    

}
