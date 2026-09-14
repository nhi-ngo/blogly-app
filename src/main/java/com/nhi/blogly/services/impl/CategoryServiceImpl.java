package com.nhi.blogly.services.impl;

import com.nhi.blogly.domain.entities.Category;
import com.nhi.blogly.repositories.CategoryRepository;
import com.nhi.blogly.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAllWithPostCount();
    }

    @Override
    @Transactional
    public Category createCategory(Category category) {
        String categoryName = category.getName();

        if(categoryRepository.existsByNameIgnoreCase(categoryName)) {
            throw new IllegalArgumentException(
                    "Category already exists with name: " + categoryName);
        }

        return categoryRepository.save(category);
    }
}
