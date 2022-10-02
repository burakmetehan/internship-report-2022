package tr.com.obss.jip.springfinal.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.model.UserDTO;
import tr.com.obss.jip.springfinal.model.UserResponseDTO;
import tr.com.obss.jip.springfinal.model.UserUpdateDTO;
import tr.com.obss.jip.springfinal.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /* ##### GET Mappings ##### */

    /* ##### Paged Returns ##### */

    /**
     * <em>Paged Function:</em> Can be used to search all users
     *
     * @param pageNumber non-negative integer
     * @param pageSize   non-negative integer
     * @return The page of the users
     */
    @GetMapping("")
    public ResponseEntity<Page<UserResponseDTO>> searchAllUsersWithPagination(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize) {
        return ResponseEntity.ok(userService.getAllUsersWithPagination(pageNumber, pageSize));
    }

    /**
     * <em>Paged Function:</em> Can be used to search a user by id
     *
     * @param id Take an id from request parameters, namely id.
     * @return The user with id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Page<UserResponseDTO>> searchUserById(@PathVariable(name = "id") long id) {
        PageRequest pageRequest = PageRequest.of(0, 1);
        return ResponseEntity.ok(userService.getUserByIdWithPagination(id, pageRequest)); // Only one user. Page is for frontend
    }

    /**
     * <em>Paged Function:</em> Can be used to search a user by username
     *
     * @param username   name of the user
     * @param pageNumber non-negative integer
     * @param pageSize   non-negative integer
     * @return The page of the users
     */
    @GetMapping("/username")
    public ResponseEntity<Page<UserResponseDTO>> searchUsersByName(
            @RequestParam(name = "username", defaultValue = "") String username,
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize) {
        return ResponseEntity.ok(userService.getAllUsersByUsernameWithPagination(username, pageNumber, pageSize));
    }

    /* ##### List Returns ##### */

    /**
     * <em>List Function:</em> Can be used to search all users
     *
     * @return The list of the users
     */
    @GetMapping("/no-page")
    public ResponseEntity<List<UserResponseDTO>> searchAllUsersWithoutPagination() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * <em>List Function:</em> Can be used to search a user by id
     *
     * @param id Take an id from request parameters, namely id.
     * @return The user with id.
     */
    @GetMapping("/no-page/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable(name = "id") long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /**
     * <em>List Function:</em> Can be used to search a users by username
     *
     * @param username username of the book
     * @return The list of the users
     */
    @GetMapping("/no-page/username")
    public ResponseEntity<List<UserResponseDTO>> searchUsersByNameWithoutPagination(
            @RequestParam(name = "username", defaultValue = "") String username) {
        return ResponseEntity.ok(userService.getAllUsersByUsername(username));
    }

    /* ##### POST Mappings ##### */

    /**
     * Can be used to create/add user
     *
     * @param userDTO model that consist of `name` and `password`
     * @return The user that is added
     */
    @PostMapping("")
    @Secured("ROLE_ADMIN") // Only admins can add users
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.saveUser(userDTO));
    }

    /* ##### PUT Mappings ##### */

    /**
     * Can be used to update the user
     *
     * @param id            the id of the user
     * @param userUpdateDTO model that consist of `password`
     * @return The updated user
     */
    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN") // Only admins can update users
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable(name = "id") long id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userUpdateDTO));
    }

    /* ##### DELETE Mappings ##### */

    /**
     * Can be used to delete the user.
     *
     * @param id           the id of the user
     * @param isHardDelete whether hard or soft delete
     * @return The deleted user if it is soft delete; otherwise, empty user
     */
    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN") // Only admins can delete users
    public ResponseEntity<UserResponseDTO> removeUser(
            @PathVariable(name = "id") long id,
            @RequestParam(name = "hardDelete", defaultValue = "false", required = false) boolean isHardDelete) {
        if (isHardDelete) {
            userService.deleteUser(id);
            return ResponseEntity.ok(new UserResponseDTO(new User()));
        } else {
            return ResponseEntity.ok(userService.removeUser(id));
        }
    }
}
