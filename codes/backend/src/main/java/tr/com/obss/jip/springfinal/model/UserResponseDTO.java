package tr.com.obss.jip.springfinal.model;

import tr.com.obss.jip.springfinal.entity.Book;
import tr.com.obss.jip.springfinal.entity.Role;
import tr.com.obss.jip.springfinal.entity.User;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Used for ResponseEntity. Hiding the password from response.
 * <p>
 * Can be initialized by
 * <ul>
 *     <li>providing all parameters</li>
 *     <li>providing {@link tr.com.obss.jip.springfinal.entity.User User} Object</li>
 * </ul>
 */
public class UserResponseDTO {
    private final long id;
    private final String username;

    private final Set<BookResponseDTO> readList;
    private final Set<BookResponseDTO> favoriteList;
    private final Set<RoleResponseDTO> roles;

    public UserResponseDTO(
            long id,
            String username,
            Set<BookResponseDTO> readList,
            Set<BookResponseDTO> favoriteList,
            Set<RoleResponseDTO> roles) {
        this.id = id;
        this.username = username;
        this.readList = readList;
        this.favoriteList = favoriteList;
        this.roles = roles;
    }

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();

        Set<Role> userRoles = user.getRoles();
        Set<Book> userReadList = user.getReadList();
        Set<Book> userFavoriteList = user.getFavoriteList();

        this.roles = userRoles == null ? Collections.emptySet() : userRoles.stream()
                                                                           .map(RoleResponseDTO::new)
                                                                           .collect(Collectors.toSet());
        this.readList = userReadList == null ? Collections.emptySet() : userReadList.stream()
                                                                                    .map(BookResponseDTO::new)
                                                                                    .collect(Collectors.toSet());
        this.favoriteList = userFavoriteList == null ? Collections.emptySet() : userFavoriteList.stream()
                                                                                                .map(BookResponseDTO::new)
                                                                                                .collect(Collectors.toSet());
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Set<BookResponseDTO> getReadList() {
        return readList;
    }

    public Set<BookResponseDTO> getFavoriteList() {
        return favoriteList;
    }

    public Set<RoleResponseDTO> getRoles() {
        return roles;
    }
}
