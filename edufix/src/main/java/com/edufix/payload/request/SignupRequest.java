package com.edufix.payload.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 40)
    private String password;

    @Size(max = 15)
    private String phone;

    @NotBlank
    private String userType;

    // Faculty specific fields
    private String department;
    private String employeeId;

    // Staff specific fields
    private String specialization;
    private String experience;
    private String certifications;
}