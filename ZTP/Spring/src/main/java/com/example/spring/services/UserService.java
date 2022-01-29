package com.example.spring.services;

import com.example.spring.models.Role;
import com.example.spring.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    private Map<String, User> users;

    @Autowired
    public UserService() {
        Map<String, User> users = new HashMap<>();
        users.put("user", new User("user", "user"));
        users.put("user1", new User("user1", "user1"));
        users.put("user2", new User("user2", "user2"));
        users.put("admin", new User("admin", "admin", Role.ADMIN));
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return loginByUsername(s);
    }

    public User loginByUsername(String username) {
        return users.get(username);
    }
}
