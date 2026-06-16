package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.SupplierIn;
import cl.ucm.inventario_bodega.dto.out.SupplierOut;
import cl.ucm.inventario_bodega.entity.Supplier;
import cl.ucm.inventario_bodega.repository.SupplierRepository;
import cl.ucm.inventario_bodega.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public List<SupplierOut> findAll() {
        return supplierRepository.findAll().stream()
                .map(this::toOut)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierOut findById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        return toOut(supplier);
    }

    @Override
    public SupplierOut save(SupplierIn supplierIn) {
        Supplier supplier = Supplier.builder()
                .name(supplierIn.getName())
                .contactEmail(supplierIn.getContactEmail())
                .phone(supplierIn.getPhone())
                .build();
        return toOut(supplierRepository.save(supplier));
    }

    @Override
    public SupplierOut update(Long id, SupplierIn supplierIn) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        supplier.setName(supplierIn.getName());
        supplier.setContactEmail(supplierIn.getContactEmail());
        supplier.setPhone(supplierIn.getPhone());
        return toOut(supplierRepository.save(supplier));
    }

    @Override
    public void delete(Long id) {
        supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        supplierRepository.deleteById(id);
    }

    private SupplierOut toOut(Supplier supplier) {
        SupplierOut out = new SupplierOut();
        out.setId(supplier.getId());
        out.setName(supplier.getName());
        out.setContactEmail(supplier.getContactEmail());
        out.setPhone(supplier.getPhone());
        return out;
    }
}