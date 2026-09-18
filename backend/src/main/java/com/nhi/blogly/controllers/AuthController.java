package com.nhi.blogly.controllers;

import com.nhi.blogly.domain.dtos.AuthResponse;
import com.nhi.blogly.domain.dtos.LoginRequest;
import com.nhi.blogly.domain.dtos.RegisterRequest;
import com.nhi.blogly.domain.dtos.UserResponse;
import com.nhi.blogly.domain.entities.User;
import com.nhi.blogly.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        String tokenValue = authenticationService.generateToken(userDetails);
        AuthResponse authResponse = AuthResponse.builder()
                .token(tokenValue)
                .expiresIn(86400)
                .build();

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        User newUser = authenticationService.register(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(
                new UserResponse(
                        newUser.getId(),
                        newUser.getName(),
                        newUser.getEmail()
                )
        );
    }

    @PostMapping("/{logout}")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
