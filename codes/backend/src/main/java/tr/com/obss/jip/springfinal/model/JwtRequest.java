package tr.com.obss.jip.springfinal.model;

import javax.validation.constraints.NotBlank;

public class JwtRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    public JwtRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
