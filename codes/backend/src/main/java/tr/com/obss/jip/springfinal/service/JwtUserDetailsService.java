package tr.com.obss.jip.springfinal.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import tr.com.obss.jip.springfinal.entity.User;
import tr.com.obss.jip.springfinal.model.MyUserDetails;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userService.getUserByUsername(username);
        return new MyUserDetails(user);
    }
}
