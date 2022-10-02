package tr.com.obss.jip.springfinal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponseDTO {
    private boolean admin;
    private boolean valid;
    private String token;
    private String username;

    public AuthResponseDTO(boolean valid) {
        this.admin = false;
        this.valid = valid;
        this.token = null;
        this.username = null;
    }

    public AuthResponseDTO(boolean admin, boolean valid, String token, String username) {
        this.admin = admin;
        this.valid = valid;
        this.token = token;
        this.username = username;
    }

    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @JsonProperty("isValid")
    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    @JsonProperty("token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
