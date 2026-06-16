package cl.ucm.inventario_bodega.repository;

import cl.ucm.inventario_bodega.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}