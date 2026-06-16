package cl.ucm.inventario_bodega.controller;

import cl.ucm.inventario_bodega.dto.in.StockMovementIn;
import cl.ucm.inventario_bodega.dto.out.StockMovementOut;
import cl.ucm.inventario_bodega.error.ErrorInfo;
import cl.ucm.inventario_bodega.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movements")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StockMovementController {

    private final StockMovementService stockMovementService;

    @GetMapping
    public ResponseEntity<List<StockMovementOut>> findAll() {
        return ResponseEntity.ok(stockMovementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(stockMovementService.findById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorInfo(404, e.getMessage()));
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockMovementOut>> findByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(stockMovementService.findByProduct(productId));
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody StockMovementIn movementIn) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(stockMovementService.save(movementIn));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorInfo(400, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            stockMovementService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorInfo(404, e.getMessage()));
        }
    }
}