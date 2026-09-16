package com.nhi.blogly.services.impl;

import com.nhi.blogly.domain.entities.Tag;
import com.nhi.blogly.repositories.TagRepository;
import com.nhi.blogly.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
}
