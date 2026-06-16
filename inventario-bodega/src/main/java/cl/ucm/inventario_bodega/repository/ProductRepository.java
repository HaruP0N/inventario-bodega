package cl.ucm.inventario_bodega.repository;

import cl.ucm.inventario_bodega.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_Id(Long categoryId);
    List<Product> findBySupplier_Id(Long supplierId);
    List<Product> findByWarehouse_Id(Long warehouseId);
    List<Product> findByStockLessThan(Integer stock);
}