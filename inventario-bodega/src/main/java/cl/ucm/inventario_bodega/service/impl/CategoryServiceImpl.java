package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.CategoryIn;
import cl.ucm.inventario_bodega.dto.out.CategoryOut;
import cl.ucm.inventario_bodega.entity.Category;
import cl.ucm.inventario_bodega.repository.CategoryRepository;
import cl.ucm.inventario_bodega.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryOut> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryOut findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        return toOut(category);
    }

    @Override
    public CategoryOut save(CategoryIn categoryIn) {
        Category category = Category.builder()
                .name(categoryIn.getName())
                .description(categoryIn.getDescription())
                .build();
        return toOut(categoryRepository.save(category));
    }

    @Override
    public CategoryOut update(Long id, CategoryIn categoryIn) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        category.setName(categoryIn.getName());
        category.setDescription(categoryIn.getDescription());
        return toOut(categoryRepository.save(category));
    }

    @Override
    public void delete(Long id) {
        categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        categoryRepository.deleteById(id);
    }

    private CategoryOut toOut(Category category) {
        CategoryOut out = new CategoryOut();
        out.setId(category.getId());
        out.setName(category.getName());
        out.setDescription(category.getDescription());
        return out;
    }
}