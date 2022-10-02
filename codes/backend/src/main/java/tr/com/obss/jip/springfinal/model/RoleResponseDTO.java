package tr.com.obss.jip.springfinal.model;

import tr.com.obss.jip.springfinal.entity.Role;

public class RoleResponseDTO {
    private final long id;
    private final String name;

    public RoleResponseDTO(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public RoleResponseDTO(Role role) {
        this.id = role.getId();
        this.name = role.getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
