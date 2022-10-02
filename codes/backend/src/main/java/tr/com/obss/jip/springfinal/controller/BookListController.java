package tr.com.obss.jip.springfinal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.model.UserResponseDTO;
import tr.com.obss.jip.springfinal.service.BookListService;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "*")
public class BookListController {
    private final BookListService bookListService;

    public BookListController(BookListService bookListService) {
        this.bookListService = bookListService;
    }


    /**
     * Add/remove book to/from the read list of user.
     * @param userId ID of the user whose list will be modified.
     * @param bookId ID of the book which will be added or removed from read list of user.
     * @param isAdd  boolean value which indicates whether the given book will be added or removed.
     *               If it is true, the book will be added. If it is false, the book will be removed.
     * @return a {@link User User} object who is modified.
     */
    @PutMapping("/read")
    public ResponseEntity<UserResponseDTO> readListControl(
            @RequestParam(name = "userId") long userId,
            @RequestParam(name = "bookId") long bookId,
            @RequestParam(name = "isAdd") boolean isAdd) {
        if (isAdd) {
            return ResponseEntity.ok().body(bookListService.addBookToReadList(userId, bookId));
        } else {
            return ResponseEntity.ok().body(bookListService.removeBookFromReadList(userId, bookId));
        }
    }

    /**
     * Add/remove book to/from the read list of user.
     * @param userId ID of the user whose list will be modified.
     * @param bookId ID of the book which will be added or removed from read list of user.
     * @param isAdd  boolean value which indicates whether the given book will be added or removed.
     *               If it is true, the book will be added. If it is false, the book will be removed.
     * @return a {@link User User} object who is modified.
     */
    @PutMapping("/fav")
    public ResponseEntity<UserResponseDTO> favoriteListControl(
            @RequestParam(name = "userId") long userId,
            @RequestParam(name = "bookId") long bookId,
            @RequestParam(name = "isAdd") boolean isAdd) {
        if (isAdd) {
            return ResponseEntity.ok().body(bookListService.addBookToFavoriteList(userId, bookId));
        } else {
            return ResponseEntity.ok().body(bookListService.removeBookFromFavoriteList(userId, bookId));
        }
    }
}
