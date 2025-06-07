package com.edufix.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edufix.models.EPriority;
import com.edufix.models.ERequestStatus;
import com.edufix.models.MaintenanceRequest;
import com.edufix.models.User;
import com.edufix.payload.request.MaintenanceRequestDto;
import com.edufix.payload.response.MessageResponse;
import com.edufix.repositories.MaintenanceRequestRepository;
import com.edufix.repositories.UserRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/requests")
public class MaintenanceRequestController {
    @Autowired
    MaintenanceRequestRepository requestRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<?> createRequest(@Valid @RequestBody MaintenanceRequestDto requestDto) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        MaintenanceRequest request = new MaintenanceRequest();
        request.setRequestId("REQ-" + UUID.randomUUID().toString().substring(0, 8));
        request.setTitle(requestDto.getTitle());
        request.setDescription(requestDto.getDescription());
        request.setLocation(requestDto.getLocation());
        request.setCategory(requestDto.getCategory());
        request.setPriority(EPriority.valueOf(requestDto.getPriority().toUpperCase()));
        request.setStatus(ERequestStatus.PENDING);
        request.setSubmittedBy(currentUser);

        requestRepository.save(request);
        return ResponseEntity.ok(new MessageResponse("Maintenance request created successfully!"));
    }

    @GetMapping("/my-requests")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<?> getMyRequests() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        List<MaintenanceRequest> requests = requestRepository.findBySubmittedBy(currentUser);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/assigned-to-me")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<?> getAssignedRequests() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        List<MaintenanceRequest> requests = requestRepository.findByAssignedTo(currentUser);
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/assign/{requestId}/to/{staffId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignRequest(@PathVariable Long requestId, @PathVariable Long staffId) {
        MaintenanceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Error: Maintenance request not found."));

        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Error: Staff member not found."));

        request.setAssignedTo(staff);
        request.setStatus(ERequestStatus.ASSIGNED);
        requestRepository.save(request);

        return ResponseEntity.ok(new MessageResponse("Request assigned successfully!"));
    }

    @PutMapping("/update-status/{requestId}/{status}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<?> updateStatus(@PathVariable Long requestId, @PathVariable String status) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        MaintenanceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Error: Maintenance request not found."));

        // Verify the staff member is assigned to this request
        if (request.getAssignedTo() == null || !request.getAssignedTo().getId().equals(currentUser.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: You are not assigned to this request."));
        }

        ERequestStatus newStatus = ERequestStatus.valueOf(status.toUpperCase());
        request.setStatus(newStatus);

        // Track when work started or completed
        if (newStatus == ERequestStatus.IN_PROGRESS && request.getWorkStarted() == null) {
            request.setWorkStarted(LocalDateTime.now());
        } else if (newStatus == ERequestStatus.COMPLETED && request.getWorkCompleted() == null) {
            request.setWorkCompleted(LocalDateTime.now());
        }

        requestRepository.save(request);

        return ResponseEntity.ok(new MessageResponse("Request status updated successfully!"));
    }

    @PutMapping("/update-notes/{requestId}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<?> updateNotes(@PathVariable Long requestId, @RequestBody String notes) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        MaintenanceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Error: Maintenance request not found."));

        // Verify the staff member is assigned to this request
        if (request.getAssignedTo() == null || !request.getAssignedTo().getId().equals(currentUser.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: You are not assigned to this request."));
        }

        request.setNotes(notes);
        requestRepository.save(request);

        return ResponseEntity.ok(new MessageResponse("Request notes updated successfully!"));
    }
}