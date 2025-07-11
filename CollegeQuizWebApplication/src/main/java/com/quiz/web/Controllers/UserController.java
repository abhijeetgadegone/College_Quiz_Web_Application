package com.quiz.web.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quiz.enums.UserRoles;
import com.quiz.web.entities.User;
import com.quiz.web.services.user.TestResultService;
import com.quiz.web.services.user.userService;

@RestController
@RequestMapping("api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private userService userservice;
    
    @Autowired
    private TestResultService testResultService;


    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        if (userservice.hasUserWithEmail(user.getEmail())) {
        	System.out.println("Incoming User: " + user);

            return new ResponseEntity<>("user already exists", HttpStatus.NOT_ACCEPTABLE);
            
        }

        User createUser = userservice.createUser(user);
        if (createUser == null) {
            return new ResponseEntity<>("user not created, come again later", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = userservice.login(user);
        if (dbUser == null) {
            return new ResponseEntity<>("Wrong Credentials", HttpStatus.NOT_ACCEPTABLE);
        }System.out.println("Branch from DB: " + dbUser.getBranch());
        return new ResponseEntity<>(dbUser, HttpStatus.OK);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> createAdmin(@RequestBody User user) {
        String secretPasskey = "apcoer123";

        if (!user.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        if (!user.getRoles().equals(UserRoles.ADMIN)) {
            return new ResponseEntity<>("Invalid role", HttpStatus.BAD_REQUEST);
        }

        if (!user.getPasskey().equals(secretPasskey)) {
            return new ResponseEntity<>("Invalid admin passkey", HttpStatus.UNAUTHORIZED);
        }

        if (userservice.hasUserWithEmail(user.getEmail())) {
            return new ResponseEntity<>("Admin already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(userservice.createAdmin(user), HttpStatus.OK);
    }
    
    @GetMapping("/user/{userId}/attempted-tests")
    public ResponseEntity<List<Long>> getAttemptedTestIds(@PathVariable Long userId) {
        List<Long> attemptedTestIds = testResultService.getAttemptedTestIdsByUser(userId);
        return ResponseEntity.ok(attemptedTestIds);
    }

}
