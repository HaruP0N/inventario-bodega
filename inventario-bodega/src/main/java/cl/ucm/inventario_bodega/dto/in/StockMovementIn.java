package cl.ucm.inventario_bodega.dto.in;

import lombok.Data;

@Data
public class StockMovementIn {
    private String type;
    private Integer quantity;
    private String reason;
    private Long productId;
}