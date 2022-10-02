package tr.com.obss.jip.springfinal.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.springfinal.model.BookDTO;
import tr.com.obss.jip.springfinal.model.BookResponseDTO;
import tr.com.obss.jip.springfinal.model.BookUpdateDTO;
import tr.com.obss.jip.springfinal.service.BookService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /* ########## GET Mappings ########## */

    /* ##### Paged Returns ##### */

    /**
     * <em>Paged Function:</em> Can be used to search all books
     *
     * @param pageNumber non-negative integer
     * @param pageSize   non-negative integer
     * @return The page of the books
     */
    @GetMapping("")
    public ResponseEntity<Page<BookResponseDTO>> searchAllBooksWithPagination(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize) {
        return ResponseEntity.ok(bookService.getAllBooksWithPagination(pageNumber, pageSize));
    }

    /**
     * <em>Paged Function:</em> Can be used to search a book by id
     *
     * @param id Take an id from request parameters, namely id.
     * @return The book with id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Page<BookResponseDTO>> searchBookById(@PathVariable(name = "id") long id) {
        PageRequest pageRequest = PageRequest.of(0, 1);
        return ResponseEntity.ok(bookService.getBookById(id, pageRequest)); // Only one book. Page is for frontend
    }

    /**
     * <em>Paged Function:</em> Can be used to search a book by name
     *
     * @param name       name of the book
     * @param pageNumber non-negative integer
     * @param pageSize   non-negative integer
     * @return The page of the books
     */
    @GetMapping("/name")
    public ResponseEntity<Page<BookResponseDTO>> searchBooksByName(
            @RequestParam(name = "bookName", defaultValue = "") String name,
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize) {
        return ResponseEntity.ok(bookService.getAllBooksByNameWithPagination(name, pageNumber, pageSize));
    }

    /* ##### List Returns ##### */

    /**
     * <em>List Function:</em> Can be used to search all books
     *
     * @return The list of the books
     */
    @GetMapping("/no-page")
    public ResponseEntity<List<BookResponseDTO>> searchAllBooksWithoutPagination() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    /**
     * <em>List Function:</em> Can be used to search a book by id
     *
     * @param id Take an id from request parameters, namely id.
     * @return The book with id.
     */
    @GetMapping("/no-page/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable(name = "id") long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    /**
     * <em>List Function:</em> Can be used to search a book by name
     *
     * @param name name of the book
     * @return The list of the books
     */
    @GetMapping("/no-page/name")
    public ResponseEntity<List<BookResponseDTO>> searchBooksByNameWithoutPagination(
            @RequestParam(name = "bookName", defaultValue = "") String name) {
        return ResponseEntity.ok(bookService.getAllBooksByName(name));
    }


    /* ########## POST Mappings ########## */

    /**
     * Can be used to create/add book
     *
     * @param bookDTO model that consist of `name`, `author`, `pageCount`, `type`, `publisher` and `publicationDate`
     * @return The book that is added
     */
    @PostMapping("")
    @Secured("ROLE_ADMIN") // Only admins can add books
    public ResponseEntity<BookResponseDTO> createBook(@Valid @RequestBody @DateTimeFormat BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.saveBook(bookDTO));
    }

    /* ########## PUT Mappings ########## */

    /**
     * Can be used to update the book
     *
     * @param id            the id of the book
     * @param bookUpdateDTO model that consist of `name`, `author`, `pageCount`, `publisher` and `publicationDate`
     * @return The updated book
     */
    @PutMapping("/{bookId}")
    @Secured("ROLE_ADMIN") // Only admins can update books
    public ResponseEntity<BookResponseDTO> updateBook(
            @PathVariable(name = "bookId") long id, @Valid @RequestBody @DateTimeFormat BookUpdateDTO bookUpdateDTO) {
        return ResponseEntity.ok(bookService.updateBook(id, bookUpdateDTO));
    }

    /* ########## DELETE Mappings ########## */

    /**
     * Can be used to delete the book.
     *
     * @param id           the id of the book
     * @param isHardDelete whether hard or soft delete
     * @return The deleted book if it is soft delete; otherwise, empty book
     */
    @DeleteMapping("/{bookId}")
    @Secured("ROLE_ADMIN") // Only admins can delete books
    public ResponseEntity<Boolean> removeBook(
            @PathVariable(name = "bookId") long id,
            @RequestParam(name = "hardDelete", defaultValue = "false", required = false) boolean isHardDelete) {
        if (isHardDelete) {
            return ResponseEntity.ok().body(bookService.deleteBook(id));
        } else {
            return ResponseEntity.ok(bookService.removeBook(id));
        }
    }
}
