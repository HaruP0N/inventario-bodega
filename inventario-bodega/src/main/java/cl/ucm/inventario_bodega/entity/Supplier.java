package cl.ucm.inventario_bodega.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String contactEmail;
    private String phone;

    @OneToMany(mappedBy = "supplier")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Product> products;
}