package tr.com.obss.jip.springfinal.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class User extends EntityBase {
    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "READ_LIST",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID"))
    @JsonManagedReference
    private Set<Book> readList;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "FAVORITE_LIST",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID"))
    @JsonManagedReference
    private Set<Book> favoriteList;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "USERS_ROLES",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID"))
    @JsonManagedReference
    private Set<Role> roles;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Book> getReadList() {
        return readList;
    }

    public void setReadList(Set<Book> readList) {
        this.readList = readList;
    }

    public Set<Book> getFavoriteList() {
        return favoriteList;
    }

    public void setFavoriteList(Set<Book> favoriteList) {
        this.favoriteList = favoriteList;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    // add/remove for readList
    public boolean addBookToReadList(Book book) {
        return this.readList.add(book);
    }

    public boolean removeBookFromReadList(Book book) {
        return this.readList.remove(book);
    }

    // add/remove for favoriteList
    public boolean addBookToFavoriteList(Book book) {
        return this.favoriteList.add(book);
    }

    public boolean removeBookFromFavoriteList(Book book) {
        return this.favoriteList.remove(book);
    }

    // add/remove for roles
    public boolean addRole(Role role) {
        return this.roles.add(role);
    }

    public boolean removeRole(Role role) {
        return this.roles.remove(role);
    }
}
