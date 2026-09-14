package com.nhi.blogly.services.impl;

import com.nhi.blogly.domain.entities.Category;
import com.nhi.blogly.repositories.CategoryRepository;
import com.nhi.blogly.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAllWithPostCount();
    }
}
