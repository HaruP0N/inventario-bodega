package cl.ucm.inventario_bodega.dto.in;

import lombok.Data;

@Data
public class SupplierIn {
    private String name;
    private String contactEmail;
    private String phone;
}