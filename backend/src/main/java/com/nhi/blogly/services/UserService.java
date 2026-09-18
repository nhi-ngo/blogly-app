package com.nhi.blogly.services;

import com.nhi.blogly.domain.entities.User;

import java.util.UUID;

public interface UserService {

    User getUserById(UUID id);
}
