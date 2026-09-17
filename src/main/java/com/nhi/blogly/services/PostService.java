package com.nhi.blogly.services;

import com.nhi.blogly.domain.dtos.CreatePostRequest;
import com.nhi.blogly.domain.dtos.UpdatePostRequest;
import com.nhi.blogly.domain.entities.Post;
import com.nhi.blogly.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostService {

    List<Post> getPosts(UUID categoryId, UUID tagId);

    List<Post> getDrafts(User user);

    Post createPost(User user, CreatePostRequest createPostRequest);

    void deletePost(UUID id);

    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
}
