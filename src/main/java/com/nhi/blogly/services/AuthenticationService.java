package com.nhi.blogly.services;

import com.nhi.blogly.domain.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {

    UserDetails authenticate(String email, String password);

    String generateToken(UserDetails userDetails);

    UserDetails validateToken(String token);

    User register(String name, String email, String password);
}
