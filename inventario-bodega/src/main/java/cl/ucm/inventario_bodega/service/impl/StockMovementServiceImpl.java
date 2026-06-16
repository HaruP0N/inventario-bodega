package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.StockMovementIn;
import cl.ucm.inventario_bodega.dto.out.StockMovementOut;
import cl.ucm.inventario_bodega.entity.MovementType;
import cl.ucm.inventario_bodega.entity.Product;
import cl.ucm.inventario_bodega.entity.StockMovement;
import cl.ucm.inventario_bodega.repository.ProductRepository;
import cl.ucm.inventario_bodega.repository.StockMovementRepository;
import cl.ucm.inventario_bodega.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final ProductRepository productRepository;

    @Override
    public List<StockMovementOut> findAll() {
        return stockMovementRepository.findAll().stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public StockMovementOut findById(Long id) {
        StockMovement movement = stockMovementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimiento no encontrado"));
        return toOut(movement);
    }

    @Override
    public StockMovementOut save(StockMovementIn movementIn) {
        Product product = productRepository.findById(movementIn.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        MovementType type = MovementType.valueOf(movementIn.getType().toUpperCase());

        if (type == MovementType.SALIDA && product.getStock() < movementIn.getQuantity()) {
            throw new RuntimeException("Stock insuficiente");
        }

        if (type == MovementType.ENTRADA) {
            product.setStock(product.getStock() + movementIn.getQuantity());
        } else {
            product.setStock(product.getStock() - movementIn.getQuantity());
        }
        productRepository.save(product);

        StockMovement movement = StockMovement.builder()
                .type(type)
                .quantity(movementIn.getQuantity())
                .reason(movementIn.getReason())
                .date(LocalDateTime.now())
                .product(product)
                .build();

        return toOut(stockMovementRepository.save(movement));
    }

    @Override
    public void delete(Long id) {
        stockMovementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimiento no encontrado"));
        stockMovementRepository.deleteById(id);
    }

    @Override
    public List<StockMovementOut> findByProduct(Long productId) {
        return stockMovementRepository.findByProduct_Id(productId).stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    private StockMovementOut toOut(StockMovement movement) {
        StockMovementOut out = new StockMovementOut();
        out.setId(movement.getId());
        out.setType(movement.getType().name());
        out.setQuantity(movement.getQuantity());
        out.setReason(movement.getReason());
        out.setDate(movement.getDate());
        if (movement.getProduct() != null) out.setProductName(movement.getProduct().getName());
        return out;
    }
}