package cl.ucm.inventario_bodega.dto.out;

import lombok.Data;

@Data
public class SupplierOut {
    private Long id;
    private String name;
    private String contactEmail;
    private String phone;
}