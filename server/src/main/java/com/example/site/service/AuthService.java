package com.example.site.service;

import com.example.site.dto.User;
import com.example.site.dto.auth.VkAccessToken;
import com.example.site.dto.auth.VkSilentToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final RestTemplate restTemplate;
    private final UserService userService;
    private final JwtService jwtService;
    private final String vkUrl;

    public AuthService(
            RestTemplate restTemplate,
            UserService userService,
            JwtService jwtService,
            @Value("${vk.url}") String vkUrl
    ) {
        this.restTemplate = restTemplate;
        this.userService = userService;
        this.jwtService = jwtService;
        this.vkUrl = vkUrl;
    }

    public ResponseEntity<String> giveJwt(VkSilentToken vkSilentToken) {
        var vkAccessTokenResponseEntity = restTemplate.postForEntity(
                vkUrl,
                null,
                VkAccessToken.class,
                vkSilentToken.token(), vkSilentToken.uuid()
        );
        HttpStatusCode httpStatusCode = vkAccessTokenResponseEntity.getStatusCode();
        VkAccessToken vkAccessToken = vkAccessTokenResponseEntity.getBody();
        if (httpStatusCode.isError() || vkAccessToken == null) {
            return ResponseEntity.status(httpStatusCode).build();
        }
        long id = vkAccessToken.response().userId();
        User user = userService.findById(id)
                .orElseGet(() -> userService.createUser(id));
        String jwt = jwtService.generateToken(user);
        return ResponseEntity.ok(jwt);
    }
}
