package com.quiz.web.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quiz.enums.UserRoles;
import com.quiz.web.entities.User;

public interface UserRepo extends JpaRepository<User, Long> {
    
    // Fetch the first user by email, generally will return one user
    User findFirstByEmail(String email);
    
    // Find users based on their role
    List<User> findByRoles(UserRoles roles);
    
    // Find a user by email, returning an Optional
    Optional<User> findByEmail(String email);
    
    // Check if a user exists by id, testId, and submitted status
    boolean existsByIdAndTestIdAndSubmitted(Long id, Long testId, boolean submitted);
}
