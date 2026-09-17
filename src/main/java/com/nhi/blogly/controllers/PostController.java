package com.nhi.blogly.controllers;

import com.nhi.blogly.domain.dtos.CreatePostRequest;
import com.nhi.blogly.domain.dtos.PostDto;
import com.nhi.blogly.domain.entities.Post;
import com.nhi.blogly.domain.entities.User;
import com.nhi.blogly.mappers.PostMapper;
import com.nhi.blogly.services.PostService;
import com.nhi.blogly.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getPosts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID tagId
    ) {
        List<Post> posts = postService.getPosts(categoryId, tagId);
        List<PostDto> postDtos = posts.stream()
                .map(postMapper::toDto)
                .toList();

        return ResponseEntity.ok(postDtos);
    }

    @GetMapping("/drafts")
    public ResponseEntity<List<PostDto>> getDrafts(@RequestAttribute UUID userId) {

        User loggedInUser = userService.getUserById(userId);
        List<Post> drafts = postService.getDrafts(loggedInUser);
        List<PostDto> draftDtos = drafts.stream()
                .map(postMapper::toDto)
                .toList();

        return ResponseEntity.ok(draftDtos);
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(
            @Valid @RequestBody CreatePostRequest createPostRequest,
            @RequestAttribute UUID userId
    ) {
        User loggedInUser = userService.getUserById(userId);

        Post createdPost = postService.createPost(loggedInUser, createPostRequest);
        PostDto createdPostDto = postMapper.toDto(createdPost);

        return new ResponseEntity<>(createdPostDto, HttpStatus.CREATED);
    }
}
