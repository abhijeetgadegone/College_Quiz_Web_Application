package com.quiz.web.services.user;

import java.util.List;

public interface TestResultService {
	List<Long> getAttemptedTestIdsByUser(Long userId);
}
