package com.edufix.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edufix.models.ERole;
import com.edufix.models.EUserType;
import com.edufix.models.Role;
import com.edufix.models.User;
import com.edufix.payload.request.LoginRequest;
import com.edufix.payload.request.SignupRequest;
import com.edufix.payload.response.JwtResponse;
import com.edufix.payload.response.MessageResponse;
import com.edufix.repositories.RoleRepository;
import com.edufix.repositories.UserRepository;
import com.edufix.security.jwt.JwtUtils;
import com.edufix.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                roles,
                loginRequest.getUserType()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        User user = new User(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getPhone()
        );

        String strUserType = signUpRequest.getUserType();
        EUserType userType;
        Set<Role> roles = new HashSet<>();

        switch (strUserType.toLowerCase()) {
            case "faculty":
                userType = EUserType.FACULTY;
                user.setDepartment(signUpRequest.getDepartment());
                user.setEmployeeId(signUpRequest.getEmployeeId());
                roles.add(roleRepository.findByName(ERole.ROLE_FACULTY)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found.")));
                break;
            case "staff":
                userType = EUserType.STAFF;
                user.setSpecialization(signUpRequest.getSpecialization());
                user.setExperience(signUpRequest.getExperience());
                user.setCertifications(signUpRequest.getCertifications());
                roles.add(roleRepository.findByName(ERole.ROLE_STAFF)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found.")));
                break;
            default:
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Invalid user type."));
        }

        user.setUserType(userType);

        // All users get the basic user role
        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role not found.")));

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully! Awaiting admin approval."));
    }

    @PostMapping("/admin/signin")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        if (!roles.contains("ROLE_ADMIN")) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Access denied. Admin privileges required."));
        }

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                roles,
                "ADMIN"));
    }
}