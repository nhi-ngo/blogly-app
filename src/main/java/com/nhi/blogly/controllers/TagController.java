package com.nhi.blogly.controllers;

import com.nhi.blogly.domain.dtos.TagResponse;
import com.nhi.blogly.domain.entities.Tag;
import com.nhi.blogly.mappers.TagMapper;
import com.nhi.blogly.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper tagMapper;

    @GetMapping
    public ResponseEntity<List<TagResponse>> getTags() {

        List<Tag> tags = tagService.getTags();
        List<TagResponse> tagResponses = tags
                .stream()
                .map(tagMapper::toTagResponse)
                .toList();

        return ResponseEntity.ok(tagResponses);
    }
}
