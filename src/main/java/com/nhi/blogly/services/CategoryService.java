package com.nhi.blogly.services;

import com.nhi.blogly.domain.dtos.CreateCategoryRequest;
import com.nhi.blogly.domain.entities.Category;
import jakarta.validation.Valid;

import java.util.List;

public interface CategoryService {

    List<Category> listCategories();

    Category createCategory(Category category);
}
