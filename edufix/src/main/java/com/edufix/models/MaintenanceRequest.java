package com.edufix.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String requestId;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERequestStatus status = ERequestStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EPriority priority;

    @CreationTimestamp
    private LocalDateTime dateSubmitted;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;

    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submitter_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_maintenance_submitter"))
    private User submittedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_maintenance_assignee"))
    private User assignedTo;

    // Tracking when work is started and completed
    private LocalDateTime workStarted;
    private LocalDateTime workCompleted;
}