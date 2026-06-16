package cl.ucm.inventario_bodega.dto.in;

import lombok.Data;

@Data
public class WarehouseIn {
    private String name;
    private String location;
    private Integer capacity;
}