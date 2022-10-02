package tr.com.obss.jip.springfinal.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("User is not found!");
    }

    public UserNotFoundException(String username) {
        super(String.format("User, whose username is %s, is not found!", username));
    }

    public UserNotFoundException(long userId) {
        super(String.format("User, whose id number is %d, is not found!", userId));
    }
}
