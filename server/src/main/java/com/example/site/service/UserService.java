package com.example.site.service;

import com.example.site.dao.UserRepository;
import com.example.site.dto.User;
import com.example.site.dto.User.Role;
import com.example.site.dto.vk.VkAccessToken;
import com.example.site.dto.vk.VkUser;
import com.example.site.dto.vk.VkSilentToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final VkService vkService;

    public UserService(UserRepository userRepository, JwtService jwtService, VkService vkService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.vkService = vkService;
    }

    public String authorizeUser(VkSilentToken vkSilentToken) {
        VkAccessToken vkAccessToken = vkService.getAccessToken(vkSilentToken);
        long userId = vkAccessToken.userId();
        User user = findUser(userId).orElseGet(() -> new User(userId, Role.USER));
        updateUser(user);
        return jwtService.generateToken(user);
    }

    public Optional<User> findUser(long id) {
        return userRepository.findById(id);
    }

    public User getById(long id) {
        Optional<User> optUser = findUser(id);
        if (optUser.isEmpty()) {
            throw new RuntimeException("User(id=" + id + ") doesn't exist");
        }
        return optUser.get();
    }

    private void updateUser(User user) {
        VkUser vkUser = vkService.getVkUser(user.getId());
        user.setName(vkUser.firstName());
        user.setSurname(vkUser.lastName());
        user.setPhotoUrl(vkUser.photoUrl());
        userRepository.save(user);
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

    public User createStubUser(long id, Role role) {
        Optional<User> optUser = findUser(id);
        if (optUser.isPresent()) {
            return optUser.get();
        }
        User user = new User(id, role);
        user.setName("none");
        user.setSurname("none");
        user.setPhotoUrl("none");
        userRepository.save(user);
        return user;
    }

    public boolean hasPermission(long id, String jwt) {
        if (!jwtService.isTokenValid(jwt)) {
            return false;
        }
        Role role = jwtService.extractUserRole(jwt);
        long jwtId = jwtService.extractUserId(jwt);
        return role == Role.ADMIN || jwtId == id;
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
