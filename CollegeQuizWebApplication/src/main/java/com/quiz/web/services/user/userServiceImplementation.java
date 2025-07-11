package com.quiz.web.services.user;

import java.util.ArrayList;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.enums.UserRoles;

import com.quiz.web.entities.Test;
import com.quiz.web.entities.User;

import com.quiz.web.repo.UserRepo;


import jakarta.annotation.PostConstruct;

@Service
public class userServiceImplementation implements userService {

    @Autowired
    private UserRepo userrepo;
    
    @PostConstruct
    private void createAdminUser() {
        List<User> admins = userrepo.findByRoles(UserRoles.ADMIN);
        if (admins == null || admins.isEmpty()) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setRoles(UserRoles.ADMIN);
            user.setPassword("admin");
            userrepo.save(user);
        }
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userrepo.findFirstByEmail(email) != null;
    }

    @Override
    public User createUser(User user) {
        user.setRoles(UserRoles.USER);
        return userrepo.save(user);
    }

    @Override
    public User login(User user) {
        Optional<User> optionalUser = userrepo.findByEmail(user.getEmail());
        if (optionalUser.isPresent()) {
            User dbUser = optionalUser.get();
            if (user.getPassword().equals(dbUser.getPassword())) {
                return dbUser;
            }
           

        }
        return null;
        
    }

    @Override
    public User createAdmin(User user) {
        user.setRoles(UserRoles.ADMIN);
        return userrepo.save(user);
    }
    
    
   
    
}
