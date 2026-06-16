package cl.ucm.inventario_bodega.dto.out;

import lombok.Data;

@Data
public class WarehouseOut {
    private Long id;
    private String name;
    private String location;
    private Integer capacity;
}