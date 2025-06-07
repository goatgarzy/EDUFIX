package com.edufix.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MaintenanceRequestDto {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String location;

    @NotBlank
    private String category;

    @NotBlank
    private String priority;
}