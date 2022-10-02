package tr.com.obss.jip.springfinal.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.com.obss.jip.springfinal.entity.Book;
import tr.com.obss.jip.springfinal.exception.BadRequestException;
import tr.com.obss.jip.springfinal.exception.BookNotFoundException;
import tr.com.obss.jip.springfinal.model.BookDTO;
import tr.com.obss.jip.springfinal.model.BookResponseDTO;
import tr.com.obss.jip.springfinal.model.BookUpdateDTO;
import tr.com.obss.jip.springfinal.repo.BookRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * @param id ID of book to search
     * @return {@link Book Book} or throw {@link BookNotFoundException BookNotFoundException}
     */
    private Book findById(long id) {
        Optional<Book> bookOptional = bookRepository.findByIdAndActiveTrue(id);
        if (bookOptional.isPresent()) {
            return bookOptional.get();
        } else {
            throw new BookNotFoundException(id);
        }
    }

    public Book findBookById(long id) {
        return this.findById(id);
    }

    /**
     * @return List of all books
     */
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAllByActiveTrueOrderByName();
    }

    /**
     * @param pageNumber Zero-based page index, must not be negative
     * @param pageSize   The size of the page to be returned, must be greater than 0
     * @return Page of all books
     */
    public Page<BookResponseDTO> getAllBooksWithPagination(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAllByActiveTrueOrderByName(pageRequest);
    }

    /**
     * @param id ID of the book which is going to be searched
     * @return {@link Book Book} if exists
     */
    public BookResponseDTO getBookById(long id) {
        return new BookResponseDTO(this.findById(id));
    }

    /**
     * @param id       ID of the book which is going to be searched
     * @param pageable pageable for one entry with Page Size: 1, Page Number: 0
     * @return Page of book that consist of only one book at most
     */
    public Page<BookResponseDTO> getBookById(long id, Pageable pageable) {
        Page<BookResponseDTO> books = bookRepository.findByIdAndActiveTrue(id, pageable);
        if (books.isEmpty()) {
            throw new BookNotFoundException(id);
        } else {
            return books;
        }
    }

    /**
     * @param name Name of the searched book
     * @return List of books if exists
     */
    public List<BookResponseDTO> getAllBooksByName(String name) {
        List<BookResponseDTO> books = bookRepository.findAllByNameContainsIgnoreCaseAndActiveTrueOrderByName(name);
        if (books.isEmpty()) {
            throw new BookNotFoundException(name);
        } else {
            return books;
        }
    }

    /**
     * @param name       Name of the searched book
     * @param pageNumber Zero-based page index, must not be negative
     * @param pageSize   The size of the page to be returned, must be greater than 0.
     * @return Page of books if exists
     */
    public Page<BookResponseDTO> getAllBooksByNameWithPagination(String name, int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        Page<BookResponseDTO> books = bookRepository.findAllByNameContainsIgnoreCaseAndActiveTrueOrderByName(
                name,
                pageRequest);

        if (books.isEmpty()) {
            throw new BookNotFoundException(name);
        } else {
            return books;
        }
    }

    /**
     * Creating a book in database
     */
    public BookResponseDTO saveBook(BookDTO bookDTO) {
        Book book = new Book(bookDTO);
        return new BookResponseDTO(bookRepository.save(book));
    }

    /**
     * Updating a book in database
     *
     * @return {@link Book Book} Object
     */
    public BookResponseDTO updateBook(long id, BookUpdateDTO bookUpdateDTO) {
        Book book = this.findById(id);

        int newPageCount = bookUpdateDTO.getPageCount();
        String newPublisher = bookUpdateDTO.getPublisher();
        Date newPublicationDate = bookUpdateDTO.getPublicationDate();
        boolean isUpdated = false;

        if (newPageCount > 0 && newPageCount < Integer.MAX_VALUE) {
            book.setPageCount(newPageCount);
            isUpdated = true;
        }

        if (newPublisher != null && !newPublisher.isEmpty()) {
            book.setPublisher(newPublisher);
            isUpdated = true;
        }

        if (newPublicationDate != null) {
            book.setPublicationDate(newPublicationDate);
            isUpdated = true;
        }

        if (isUpdated) {
            return new BookResponseDTO(bookRepository.save(book));
        } else {
            throw new BadRequestException("Nothing is changed");
        }

    }

    /**
     * Soft delete
     */
    public Boolean removeBook(long id) {
        Book book = this.findById(id);
        book.setActive(false);
        bookRepository.save(book);
        return Boolean.TRUE;
    }

    /**
     * Hard delete
     */
    public Boolean deleteBook(long id) {
        bookRepository.deleteById(id);
        return Boolean.TRUE;
    }
}
