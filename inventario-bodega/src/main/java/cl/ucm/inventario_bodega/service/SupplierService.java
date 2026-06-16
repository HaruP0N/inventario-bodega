package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.SupplierIn;
import cl.ucm.inventario_bodega.dto.out.SupplierOut;
import java.util.List;

public interface SupplierService {
    List<SupplierOut> findAll();
    SupplierOut findById(Long id);
    SupplierOut save(SupplierIn supplierIn);
    SupplierOut update(Long id, SupplierIn supplierIn);
    void delete(Long id);
}