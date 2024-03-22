package com.example.site.service;

import com.example.site.dao.UserRepository;
import com.example.site.dto.User;
import com.example.site.dto.User.Role;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean existsById(long id) {
        return userRepository.existsById(id);
    }

    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }

    public User createUser(long id) {
        if (existsById(id)) {
            throw new RuntimeException("User(id = " + id + ") has already been created.");
        }
        return userRepository.save(new User(id, Role.ADMIN));
    }

    public UserDetailsService userDetailsService() {
        return username -> {
            try {
                long id = Long.parseLong(username);
                return userRepository.findById(id).orElseThrow();
            } catch (NumberFormatException | NoSuchElementException e) {
                throw new UsernameNotFoundException("User(username = " + username + ") doesn't exist.");
            }
        };
    }
}
