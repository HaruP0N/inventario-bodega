package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.CategoryIn;
import cl.ucm.inventario_bodega.dto.out.CategoryOut;
import java.util.List;

public interface CategoryService {
    List<CategoryOut> findAll();
    CategoryOut findById(Long id);
    CategoryOut save(CategoryIn categoryIn);
    CategoryOut update(Long id, CategoryIn categoryIn);
    void delete(Long id);
}