package tr.com.obss.jip.springfinal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.model.UserResponseDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByIdAndActiveTrue(long id);

    Optional<User> findByUsernameAndActiveTrue(String username);

    Page<UserResponseDTO> findByIdAndActiveTrue(long id, Pageable pageable);

    List<UserResponseDTO> findAllByUsernameContainsIgnoreCaseAndActiveTrueOrderByUsername(String username);

    Page<UserResponseDTO> findAllByUsernameContainsIgnoreCaseAndActiveTrueOrderByUsername(
            String username, Pageable pageable);

    List<UserResponseDTO> findAllByActiveTrueOrderByUsername();

    Page<UserResponseDTO> findAllByActiveTrueOrderByUsername(Pageable pageable);

    boolean existsByUsername(String username);
}
