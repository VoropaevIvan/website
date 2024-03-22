package com.example.site.controller;

import com.example.site.dto.auth.VkSilentToken;
import com.example.site.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<String> giveJwt(@RequestBody VkSilentToken vkSilentToken) {
        return authService.giveJwt(vkSilentToken);
    }
}
