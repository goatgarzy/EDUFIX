package com.edufix.repositories;

import com.edufix.models.User;
import com.edufix.models.ERegistrationStatus;
import com.edufix.models.EUserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRegistrationStatus(ERegistrationStatus status);
    List<User> findByUserTypeAndRegistrationStatus(EUserType userType, ERegistrationStatus status);
}