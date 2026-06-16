package cl.ucm.inventario_bodega.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "warehouses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String location;
    private Integer capacity;

    @OneToMany(mappedBy = "warehouse")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Product> products;
}