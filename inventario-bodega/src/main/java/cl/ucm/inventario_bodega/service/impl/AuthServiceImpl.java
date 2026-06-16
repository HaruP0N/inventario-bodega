package cl.ucm.inventario_bodega.service.impl;

import cl.ucm.inventario_bodega.dto.in.LoginRequest;
import cl.ucm.inventario_bodega.dto.in.RegisterRequest;
import cl.ucm.inventario_bodega.dto.out.AuthResponse;
import cl.ucm.inventario_bodega.entity.Role;
import cl.ucm.inventario_bodega.entity.User;
import cl.ucm.inventario_bodega.repository.RoleRepository;
import cl.ucm.inventario_bodega.repository.UserRepository;
import cl.ucm.inventario_bodega.security.JwtUtil;
import cl.ucm.inventario_bodega.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        try {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("El username ya existe");
            }
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("El email ya existe");
            }

            String roleName = "ROLE_" + request.getRol().toUpperCase();
            System.out.println("Buscando rol: " + roleName);

            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + roleName));

            System.out.println("Rol encontrado: " + role.getName());

            User user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .email(request.getEmail())
                    .roles(Set.of(role))
                    .build();

            userRepository.save(user);
            System.out.println("Usuario guardado: " + user.getUsername());

            return new AuthResponse(user.getUsername(), user.getEmail(), request.getRol());
        } catch (Exception e) {
            System.out.println("ERROR en register: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public String login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        return jwtUtil.generateToken(userDetails);
    }
}