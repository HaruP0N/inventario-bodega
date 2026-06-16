package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.ProductIn;
import cl.ucm.inventario_bodega.dto.out.ProductOut;
import cl.ucm.inventario_bodega.entity.Category;
import cl.ucm.inventario_bodega.entity.Product;
import cl.ucm.inventario_bodega.entity.Supplier;
import cl.ucm.inventario_bodega.entity.Warehouse;
import cl.ucm.inventario_bodega.repository.CategoryRepository;
import cl.ucm.inventario_bodega.repository.ProductRepository;
import cl.ucm.inventario_bodega.repository.SupplierRepository;
import cl.ucm.inventario_bodega.repository.WarehouseRepository;
import cl.ucm.inventario_bodega.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final WarehouseRepository warehouseRepository;

    @Override
    public List<ProductOut> findAll() {
        return productRepository.findAll().stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public ProductOut findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return toOut(product);
    }

    @Override
    public ProductOut save(ProductIn productIn) {
        Product product = buildProduct(new Product(), productIn);
        return toOut(productRepository.save(product));
    }

    @Override
    public ProductOut update(Long id, ProductIn productIn) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        buildProduct(product, productIn);
        return toOut(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductOut> findByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId).stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductOut> findLowStock(Integer threshold) {
        return productRepository.findByStockLessThan(threshold).stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    private Product buildProduct(Product product, ProductIn productIn) {
        product.setName(productIn.getName());
        product.setDescription(productIn.getDescription());
        product.setPrice(productIn.getPrice());
        product.setStock(productIn.getStock());

        Category category = categoryRepository.findById(productIn.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        product.setCategory(category);

        Supplier supplier = supplierRepository.findById(productIn.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        product.setSupplier(supplier);

        Warehouse warehouse = warehouseRepository.findById(productIn.getWarehouseId())
                .orElseThrow(() -> new RuntimeException("Bodega no encontrada"));
        product.setWarehouse(warehouse);

        return product;
    }

    private ProductOut toOut(Product product) {
        ProductOut out = new ProductOut();
        out.setId(product.getId());
        out.setName(product.getName());
        out.setDescription(product.getDescription());
        out.setPrice(product.getPrice());
        out.setStock(product.getStock());
        if (product.getCategory() != null) out.setCategoryName(product.getCategory().getName());
        if (product.getSupplier() != null) out.setSupplierName(product.getSupplier().getName());
        if (product.getWarehouse() != null) out.setWarehouseName(product.getWarehouse().getName());
        return out;
    }
}