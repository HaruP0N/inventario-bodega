package cl.ucm.inventario_bodega.dto.out;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StockMovementOut {
    private Long id;
    private String type;
    private Integer quantity;
    private String reason;
    private LocalDateTime date;
    private String productName;
}