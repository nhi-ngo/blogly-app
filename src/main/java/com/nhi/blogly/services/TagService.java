package com.nhi.blogly.services;

import com.nhi.blogly.domain.entities.Tag;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TagService {

    List<Tag> getTags();

    List<Tag> createTags(Set<String> names);

    void deleteTag(UUID id);
}
