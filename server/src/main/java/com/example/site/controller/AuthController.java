package com.example.site.controller;

import com.example.site.dto.vk.VkSilentToken;
import com.example.site.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public String authorizeUser(@RequestBody VkSilentToken vkSilentToken) {
        return userService.authorizeUser(vkSilentToken);
    }
}
