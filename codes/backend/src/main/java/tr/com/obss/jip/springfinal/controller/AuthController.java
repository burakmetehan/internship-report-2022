package tr.com.obss.jip.springfinal.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.springfinal.entity.Role;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.exception.BadRequestException;
import tr.com.obss.jip.springfinal.exception.UserNotFoundException;
import tr.com.obss.jip.springfinal.model.AuthDTO;
import tr.com.obss.jip.springfinal.model.AuthResponseDTO;
import tr.com.obss.jip.springfinal.model.JwtRequest;
import tr.com.obss.jip.springfinal.repo.UserRepository;
import tr.com.obss.jip.springfinal.service.JwtUserDetailsService;
import tr.com.obss.jip.springfinal.util.JwtTokenUtil;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUserDetailsService jwtUserDetailsService;

    @Value("${jwt.token.prefix}")
    private String tokenPrefix;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtTokenUtil jwtTokenUtil,
            JwtUserDetailsService userDetailsService,
            UserRepository userRepository,
            JwtUserDetailsService jwtUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    /**
     * Checking the JWT token is valid.
     *
     * @param authDTO {@code AuthDTO AuthDTO} object inside RequestBody
     * @return {@code AuthResponseDTO AuthResponseDTO} object
     */
    @PostMapping("")
    public ResponseEntity<AuthResponseDTO> checkAuthenticationToken(@RequestBody AuthDTO authDTO) throws
            BadRequestException {
        String token = authDTO.getToken();
        String username = authDTO.getUsername();

        if (token == null || token.isEmpty() || username == null || username.isEmpty()) {
            throw new BadRequestException("Username or token is empty");
        }

        token = token.substring(7);
        if (token.isEmpty()) { // no proper token
            throw new BadRequestException("Token does not start with Bearer");
        }

        String tokenUsername = jwtTokenUtil.getUsernameFromToken(token);
        if (!username.equals(tokenUsername)) { // username does not match
            throw new BadRequestException("Username in token does not match");
        }

        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(tokenUsername);
        Boolean isValid = jwtTokenUtil.validateToken(token, userDetails);

        if (isValid) {

            // Checking whether admin or not
            boolean isAdmin = false;
            var roles = userDetails.getAuthorities();
            for (var role : roles) {
                if (role.getAuthority().equals("ROLE_ADMIN")) {
                    isAdmin = true;
                    break;
                }
            }

            String newToken = String.format("%s %s", tokenPrefix, jwtTokenUtil.generateToken(userDetails));
            return ResponseEntity.ok().body(new AuthResponseDTO(isAdmin, true, newToken, username));
        } else {
            throw new BadRequestException("Token is not valid");
        }
    }

    /**
     * @param authenticationRequest {@code JwtRequest JwtRequest} object
     * @return {@code AuthResponseDTO AuthResponseDTO} object
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws UserNotFoundException, BadRequestException {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        Optional<User> optionalUser = userRepository.findByUsernameAndActiveTrue(authenticationRequest.getUsername());

        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException(authenticationRequest.getUsername());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = String.format("%s %s", tokenPrefix, jwtTokenUtil.generateToken(userDetails));

        // Checking whether admin or not
        boolean isAdmin = false;
        Set<Role> roles = optionalUser.get().getRoles();
        for (Role role : roles) {
            if (role.getName().equals("ROLE_ADMIN")) {
                isAdmin = true;
                break;
            }
        }

        return ResponseEntity.ok().body(new AuthResponseDTO(isAdmin, true, token, optionalUser.get().getUsername()));
    }

    private void authenticate(String username, String password) throws BadRequestException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (Exception e) {
            throw new BadRequestException("Authentication error!");
        }
    }
}
