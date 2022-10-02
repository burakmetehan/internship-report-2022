package tr.com.obss.jip.springfinal.exception;

public class BookListException extends RuntimeException {
    public final static boolean ADD_ERROR = true;
    public final static boolean REMOVE_ERROR = false;

    public final static String LIST_TYPE_READ = "read";
    public final static String LIST_TYPE_FAVORITE = "favorite";

    public BookListException() {
        super("Error occurred while adding/removing book to/from read/favorite list of user!");
    }

    public BookListException(boolean isAddError, String listType) throws ConflictException {
        if (isAddError) {
            throw new ConflictException(String.format("The book is already in the %s list!", listType));
        } else {
            throw new ConflictException(String.format("The book is not in the %s list!", listType));
        }
    }
}
