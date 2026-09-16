package com.nhi.blogly.controllers;

import com.nhi.blogly.domain.dtos.CreateTagsRequest;
import com.nhi.blogly.domain.dtos.TagResponse;
import com.nhi.blogly.domain.entities.Tag;
import com.nhi.blogly.mappers.TagMapper;
import com.nhi.blogly.services.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper tagMapper;

    @GetMapping
    public ResponseEntity<List<TagResponse>> getTags() {

        List<Tag> tags = tagService.getTags();

        List<TagResponse> tagResponses = tags.stream()
                .map(tagMapper::toTagResponse)
                .toList();

        return ResponseEntity.ok(tagResponses);
    }

    @PostMapping
    public ResponseEntity<List<TagResponse>> createTags(
            @Valid @RequestBody CreateTagsRequest createTagsRequest) {

        List<Tag> savedTags = tagService.createTags(createTagsRequest.getNames());

        List<TagResponse> newTagsResponses = savedTags.stream()
                .map(tagMapper::toTagResponse)
                .toList();

        return new ResponseEntity<>(
                newTagsResponses,
                HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID id) {
        tagService.deleteTag(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
