package com.edufix.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edufix.models.ERegistrationStatus;
import com.edufix.models.EUserType;
import com.edufix.models.MaintenanceRequest;
import com.edufix.models.User;
import com.edufix.payload.response.MessageResponse;
import com.edufix.repositories.MaintenanceRequestRepository;
import com.edufix.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    MaintenanceRequestRepository requestRepository;

    @GetMapping("/pending-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingUsers() {
        List<User> pendingUsers = userRepository.findByRegistrationStatus(ERegistrationStatus.PENDING);
        return ResponseEntity.ok(pendingUsers);
    }

    @GetMapping("/pending-users/faculty")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingFacultyUsers() {
        List<User> pendingFaculty = userRepository.findByUserTypeAndRegistrationStatus(
                EUserType.FACULTY, ERegistrationStatus.PENDING);
        return ResponseEntity.ok(pendingFaculty);
    }

    @GetMapping("/pending-users/staff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingStaffUsers() {
        List<User> pendingStaff = userRepository.findByUserTypeAndRegistrationStatus(
                EUserType.STAFF, ERegistrationStatus.PENDING);
        return ResponseEntity.ok(pendingStaff);
    }

    @PutMapping("/approve-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.setRegistrationStatus(ERegistrationStatus.APPROVED);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User approved successfully!"));
    }

    @PutMapping("/reject-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.setRegistrationStatus(ERegistrationStatus.REJECTED);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User rejected successfully!"));
    }

    @GetMapping("/maintenance-staff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getMaintenanceStaff() {
        List<User> maintenanceStaff = userRepository.findByUserTypeAndRegistrationStatus(
                EUserType.STAFF, ERegistrationStatus.APPROVED);
        return ResponseEntity.ok(maintenanceStaff);
    }

    @GetMapping("/all-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRequests() {
        List<MaintenanceRequest> requests = requestRepository.findAll();
        return ResponseEntity.ok(requests);
    }
}