package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.WarehouseIn;
import cl.ucm.inventario_bodega.dto.out.WarehouseOut;
import cl.ucm.inventario_bodega.entity.Warehouse;
import cl.ucm.inventario_bodega.repository.WarehouseRepository;
import cl.ucm.inventario_bodega.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Override
    public List<WarehouseOut> findAll() {
        return warehouseRepository.findAll().stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public WarehouseOut findById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bodega no encontrada"));
        return toOut(warehouse);
    }

    @Override
    public WarehouseOut save(WarehouseIn warehouseIn) {
        try {
            Warehouse warehouse = Warehouse.builder()
                    .name(warehouseIn.getName())
                    .location(warehouseIn.getLocation())
                    .capacity(warehouseIn.getCapacity())
                    .build();
            return toOut(warehouseRepository.save(warehouse));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public WarehouseOut update(Long id, WarehouseIn warehouseIn) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bodega no encontrada"));
        warehouse.setName(warehouseIn.getName());
        warehouse.setLocation(warehouseIn.getLocation());
        warehouse.setCapacity(warehouseIn.getCapacity());
        return toOut(warehouseRepository.save(warehouse));
    }

    @Override
    public void delete(Long id) {
        warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bodega no encontrada"));
        warehouseRepository.deleteById(id);
    }

    private WarehouseOut toOut(Warehouse warehouse) {
        WarehouseOut out = new WarehouseOut();
        out.setId(warehouse.getId());
        out.setName(warehouse.getName());
        out.setLocation(warehouse.getLocation());
        out.setCapacity(warehouse.getCapacity());
        return out;
    }
}