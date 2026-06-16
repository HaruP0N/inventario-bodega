package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.WarehouseIn;
import cl.ucm.inventario_bodega.dto.out.WarehouseOut;
import java.util.List;

public interface WarehouseService {
    List<WarehouseOut> findAll();
    WarehouseOut findById(Long id);
    WarehouseOut save(WarehouseIn warehouseIn);
    WarehouseOut update(Long id, WarehouseIn warehouseIn);
    void delete(Long id);
}