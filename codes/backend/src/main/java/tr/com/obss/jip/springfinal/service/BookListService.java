package tr.com.obss.jip.springfinal.service;

import org.springframework.stereotype.Service;
import tr.com.obss.jip.springfinal.entity.Book;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.exception.BookListException;
import tr.com.obss.jip.springfinal.model.UserResponseDTO;
import tr.com.obss.jip.springfinal.repo.UserRepository;

@Service
public class BookListService {
    private final BookService bookService;
    private final UserService userService;

    private final UserRepository userRepository;

    public BookListService(BookService bookService, UserService userService, UserRepository userRepository) {
        this.bookService = bookService;
        this.userService = userService;
        this.userRepository = userRepository;
    }


    /**
     * Add book to read list of the user.
     *
     * @param userId ID of the user which the book will be added to its list
     * @param bookId ID of the book which will be added to list of user
     * @return {@link UserResponseDTO UserResponseDTO} object
     */
    public UserResponseDTO addBookToReadList(long userId, long bookId) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);

        boolean isSuccessful = user.addBookToReadList(book);

        if (isSuccessful) {
            return new UserResponseDTO(userRepository.save(user));
        } else {
            throw new BookListException(BookListException.ADD_ERROR, BookListException.LIST_TYPE_READ);
        }
    }

    /**
     * Remove book from read list of the user.
     *
     * @param userId ID of the user which the book will be added to its list
     * @param bookId ID of the book which will be added to list of user
     * @return {@link UserResponseDTO UserResponseDTO} object
     */
    public UserResponseDTO removeBookFromReadList(long userId, long bookId) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);

        boolean isSuccessful = user.removeBookFromReadList(book);

        if (isSuccessful) {
            return new UserResponseDTO(userRepository.save(user));
        } else {
            throw new BookListException(BookListException.REMOVE_ERROR, BookListException.LIST_TYPE_READ);
        }
    }

    /**
     * Add book to favorite list of the user.
     *
     * @param userId ID of the user which the book will be added to its list
     * @param bookId ID of the book which will be added to list of user
     * @return {@link UserResponseDTO UserResponseDTO} object
     */
    public UserResponseDTO addBookToFavoriteList(long userId, long bookId) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);

        boolean isSuccessful = user.addBookToFavoriteList(book);

        if (isSuccessful) {
            return new UserResponseDTO(userRepository.save(user));
        } else {
            throw new BookListException(BookListException.ADD_ERROR, BookListException.LIST_TYPE_FAVORITE);
        }
    }

    /**
     * Remove book from favorite list of the user.
     *
     * @param userId ID of the user which the book will be added to its list
     * @param bookId ID of the book which will be added to list of user
     * @return {@link UserResponseDTO UserResponseDTO} object
     */
    public UserResponseDTO removeBookFromFavoriteList(long userId, long bookId) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);

        boolean isSuccessful = user.removeBookFromFavoriteList(book);

        if (isSuccessful) {
            return new UserResponseDTO(userRepository.save(user));
        } else {
            throw new BookListException(BookListException.REMOVE_ERROR, BookListException.LIST_TYPE_FAVORITE);
        }
    }
}
