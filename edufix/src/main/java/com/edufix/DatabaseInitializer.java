package com.edufix;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.edufix.models.ERegistrationStatus;
import com.edufix.models.ERole;
import com.edufix.models.EUserType;
import com.edufix.models.Role;
import com.edufix.models.User;
import com.edufix.repositories.RoleRepository;
import com.edufix.repositories.UserRepository;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        initRoles();

        // Initialize admin user if it doesn't exist
        initAdminUser();
    }

    private void initRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_FACULTY));
            roleRepository.save(new Role(ERole.ROLE_STAFF));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));

            System.out.println("Roles initialized successfully.");
        }
    }

    private void initAdminUser() {
        if (userRepository.findByEmail("admin@edufix.com").isEmpty()) {
            User adminUser = new User();
            adminUser.setFirstName("System");
            adminUser.setLastName("Administrator");
            adminUser.setEmail("admin@edufix.com");
            adminUser.setPassword(encoder.encode("adminPassword123"));
            adminUser.setUserType(EUserType.ADMIN);
            adminUser.setRegistrationStatus(ERegistrationStatus.APPROVED);

            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Admin role not found.")));
            roles.add(roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: User role not found.")));

            adminUser.setRoles(roles);

            userRepository.save(adminUser);

            System.out.println("Admin user initialized successfully.");
        }
    }
}