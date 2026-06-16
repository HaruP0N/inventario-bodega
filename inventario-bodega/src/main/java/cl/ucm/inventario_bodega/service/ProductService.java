package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.ProductIn;
import cl.ucm.inventario_bodega.dto.out.ProductOut;
import java.util.List;

public interface ProductService {
    List<ProductOut> findAll();
    ProductOut findById(Long id);
    ProductOut save(ProductIn productIn);
    ProductOut update(Long id, ProductIn productIn);
    void delete(Long id);
    List<ProductOut> findByCategory(Long categoryId);
    List<ProductOut> findLowStock(Integer threshold);
}