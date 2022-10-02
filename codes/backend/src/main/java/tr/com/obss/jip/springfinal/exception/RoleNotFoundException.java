package tr.com.obss.jip.springfinal.exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException() {
        super("Role is not found!");
    }

    public RoleNotFoundException(String roleName) {
        super(String.format("Role, whose name is %s, is not found!", roleName));
    }

    public RoleNotFoundException(long roleId) {
        super(String.format("Role, whose id number is %d, is not found!", roleId));
    }
}
