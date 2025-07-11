package com.quiz.web.services.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.web.repo.TestResultrepo;

@Service
public class TestResultServiceImpl implements TestResultService {
	@Autowired
    private TestResultrepo testResultRepository;
	
	 @Override
	    public List<Long> getAttemptedTestIdsByUser(Long userId) {
	        return testResultRepository.findTestIdsByUserId(userId);
	    }
}
