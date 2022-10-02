package tr.com.obss.jip.springfinal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jip.springfinal.entity.Book;
import tr.com.obss.jip.springfinal.model.BookResponseDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIdAndActiveTrue(long id);

    Page<BookResponseDTO> findByIdAndActiveTrue(long id, Pageable pageable);

    List<BookResponseDTO> findAllByActiveTrueOrderByName();

    Page<BookResponseDTO> findAllByActiveTrueOrderByName(Pageable pageable);

    List<BookResponseDTO> findAllByNameContainsIgnoreCaseAndActiveTrueOrderByName(String name);

    Page<BookResponseDTO> findAllByNameContainsIgnoreCaseAndActiveTrueOrderByName(String name, Pageable pageable);
}
