package tr.com.obss.jip.springfinal.exception;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException() {
        super("Book is not found!");
    }

    public BookNotFoundException(String bookName) {
        super(String.format("Book, whose name is %s, is not found!", bookName));
    }

    public BookNotFoundException(long bookId) {
        super(String.format("Book, whose id number is %d, is not found!", bookId));
    }
}
