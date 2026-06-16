package cl.ucm.inventario_bodega.dto.in;

import lombok.Data;

@Data
public class ProductIn {
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private Long categoryId;
    private Long supplierId;
    private Long warehouseId;
}