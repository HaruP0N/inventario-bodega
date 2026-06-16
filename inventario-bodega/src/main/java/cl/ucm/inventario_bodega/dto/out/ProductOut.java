package cl.ucm.inventario_bodega.dto.out;

import lombok.Data;

@Data
public class ProductOut {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String categoryName;
    private String supplierName;
    private String warehouseName;
}