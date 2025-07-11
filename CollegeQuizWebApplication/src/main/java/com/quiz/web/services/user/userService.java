package com.quiz.web.services.user;

import com.quiz.web.entities.User;

public interface userService {

    User createUser(User user);

    Boolean hasUserWithEmail(String email);

    User login(User user);

    User createAdmin(User user);
}
