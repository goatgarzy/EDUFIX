package com.edufix.repositories;

import com.edufix.models.MaintenanceRequest;
import com.edufix.models.ERequestStatus;
import com.edufix.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findBySubmittedBy(User user);
    List<MaintenanceRequest> findByAssignedTo(User user);
    List<MaintenanceRequest> findByStatus(ERequestStatus status);
    List<MaintenanceRequest> findByStatusAndAssignedTo(ERequestStatus status, User assignedTo);
}