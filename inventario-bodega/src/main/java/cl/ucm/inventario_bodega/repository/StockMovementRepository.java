package cl.ucm.inventario_bodega.repository;

import cl.ucm.inventario_bodega.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByProduct_Id(Long productId);
}