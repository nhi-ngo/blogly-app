package com.nhi.blogly.services.impl;

import com.nhi.blogly.domain.entities.Tag;
import com.nhi.blogly.repositories.TagRepository;
import com.nhi.blogly.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAllWithPostCount();
    }
}
