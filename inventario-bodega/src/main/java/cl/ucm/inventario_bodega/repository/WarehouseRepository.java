package cl.ucm.inventario_bodega.repository;

import cl.ucm.inventario_bodega.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}