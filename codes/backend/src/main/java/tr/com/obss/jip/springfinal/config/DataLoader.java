package tr.com.obss.jip.springfinal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tr.com.obss.jip.springfinal.entity.Role;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.exception.RoleNotFoundException;
import tr.com.obss.jip.springfinal.repo.RoleRepository;
import tr.com.obss.jip.springfinal.repo.UserRepository;

import java.util.Optional;
import java.util.Set;

@Component
public class DataLoader implements ApplicationRunner {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";

    @Value("${data-loader.admin.username}")
    private String DEFAULT_ADMIN_USERNAME;

    @Value("${data-loader.admin.password}")
    private String DEFAULT_ADMIN_PASSWORD;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    public DataLoader(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        boolean isUserRoleExists = roleRepository.existsByNameAndActiveTrue(ROLE_USER);
        boolean isAdminRoleExists = roleRepository.existsByNameAndActiveTrue(ROLE_ADMIN);
        boolean isAdminUserExists = userRepository.existsByUsername(DEFAULT_ADMIN_USERNAME);

        if (!isUserRoleExists) {
            Role userRole = new Role();
            userRole.setName(ROLE_USER);
            roleRepository.save(userRole);
        }

        if (!isAdminRoleExists) {
            Role adminRole = new Role();
            adminRole.setName(ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        if (!isAdminUserExists) {
            User adminUser = new User();
            adminUser.setUsername(DEFAULT_ADMIN_USERNAME);
            adminUser.setPassword(encoder.encode(DEFAULT_ADMIN_PASSWORD));

            Optional<Role> adminRole = roleRepository.findByNameAndActiveTrue(ROLE_ADMIN);
            Optional<Role> userRole = roleRepository.findByNameAndActiveTrue(ROLE_USER);

            if (adminRole.isPresent() && userRole.isPresent()) {
                adminUser.setRoles(Set.of(adminRole.get(), userRole.get()));
                userRepository.save(adminUser);
            } else {
                throw new RoleNotFoundException();
            }
        }
    }
}
