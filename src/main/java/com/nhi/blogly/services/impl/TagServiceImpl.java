package com.nhi.blogly.services.impl;

import com.nhi.blogly.domain.entities.Tag;
import com.nhi.blogly.repositories.TagRepository;
import com.nhi.blogly.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAllWithPostCount();
    }

    @Override
    @Transactional
    public List<Tag> createTags(Set<String> names) {
        List<Tag> existingTags = tagRepository.findByNameIn(names);

        Set<String> existingTagNames = existingTags.stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());

        List<Tag> newTags = names.stream()
                .filter(name -> !existingTagNames.contains(name))
                .map(name -> Tag.builder()
                        .name(name)
                        .build())
                .toList();

        List<Tag> savedTags = new ArrayList<>();

        if (!newTags.isEmpty()) {
            savedTags = tagRepository.saveAll(newTags);
        }

        savedTags.addAll(existingTags);

        return savedTags;
    }

    @Override
    public void deleteTag(UUID id) {
        Optional<Tag> tag = tagRepository.findById(id);
        if (tag.isPresent()) {
            if (!tag.get().getPosts().isEmpty()) {
                throw new IllegalArgumentException("Tag has posts associated with it");
            }
            tagRepository.deleteById(id);
        }
    }
}
