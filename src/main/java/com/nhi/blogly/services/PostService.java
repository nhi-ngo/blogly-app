package com.nhi.blogly.services;

import com.nhi.blogly.domain.entities.Post;

import java.util.List;
import java.util.UUID;

public interface PostService {

    List<Post> getPosts(UUID categoryId, UUID tagId);
}
