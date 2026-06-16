package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.StockMovementIn;
import cl.ucm.inventario_bodega.dto.out.StockMovementOut;
import java.util.List;

public interface StockMovementService {
    List<StockMovementOut> findAll();
    StockMovementOut findById(Long id);
    StockMovementOut save(StockMovementIn movementIn);
    void delete(Long id);
    List<StockMovementOut> findByProduct(Long productId);
}