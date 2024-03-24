package com.example.site.controller;

import com.example.site.dto.User;
import com.example.site.dto.vk.VkSilentToken;
import com.example.site.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        return userService.findUser(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/new/user")
    public User createUser(@RequestParam long id) {
        return userService.createStubUser(id, User.Role.USER);
    }

    @PostMapping("/new/admin")
    public User createAdmin(@RequestParam long id) {
        return userService.createStubUser(id, User.Role.ADMIN);
    }
}
