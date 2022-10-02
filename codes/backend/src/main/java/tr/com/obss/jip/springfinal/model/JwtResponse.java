package tr.com.obss.jip.springfinal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtResponse {
    private final boolean valid;
    private final boolean admin;
    private final String jwtToken;
    private final UserResponseDTO userResponseDTO;

    public JwtResponse(boolean valid, boolean admin, String jwtToken) {
        this.valid = valid;
        this.admin = admin;
        this.jwtToken = jwtToken;
        this.userResponseDTO = null;
    }

    public JwtResponse(boolean valid, boolean admin, String jwtToken, UserResponseDTO userResponseDTO) {
        this.valid = valid;
        this.admin = admin;
        this.jwtToken = jwtToken;
        this.userResponseDTO = userResponseDTO;
    }

    @JsonProperty("isValid")
    public boolean isValid() {
        return valid;
    }

    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return admin;
    }

    @JsonProperty("token")
    public String getJwtToken() {
        return jwtToken;
    }

    @JsonProperty("user")
    public UserResponseDTO getUserResponseDTO() {
        return userResponseDTO;
    }
}
