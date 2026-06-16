package cl.ucm.inventario_bodega.service;

import cl.ucm.inventario_bodega.dto.in.LoginRequest;
import cl.ucm.inventario_bodega.dto.in.RegisterRequest;
import cl.ucm.inventario_bodega.dto.out.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    String login(LoginRequest request);
}