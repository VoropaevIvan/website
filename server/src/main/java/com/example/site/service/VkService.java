package com.example.site.service;

import com.example.site.dto.vk.VkResponse;
import com.example.site.dto.vk.VkUser;
import com.example.site.dto.vk.VkAccessToken;
import com.example.site.dto.vk.VkSilentToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Service
public class VkService {
    private static final Logger logger = LoggerFactory.getLogger(VkService.class);

    private final RestTemplate restTemplate;

    private String exchangeTokenUrl;
    private String getUserUrl;

    public VkService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Value("${vk.exchange_token_url}")
    public void setExchangeTokenUrl(String exchangeTokenUrl) {
        this.exchangeTokenUrl = exchangeTokenUrl;
    }

    @Value("${vk.get_user_url}")
    public void setGetUserUrl(String getUserUrl) {
        this.getUserUrl = getUserUrl;
    }

    public VkAccessToken getAccessToken(VkSilentToken vkSilentToken) {
        String url = exchangeTokenUrl + "&token={silent_token}&uuid={uuid}";
        var typeRef = new ParameterizedTypeReference<VkResponse<VkAccessToken>>() {
        };
        var vkResponse = restTemplate.exchange(
                url,
                HttpMethod.POST,
                null,
                typeRef,
                vkSilentToken.token(),
                vkSilentToken.uuid()
        ).getBody();
        return Objects.requireNonNull(vkResponse).value();
    }

    public VkUser getVkUser(long id) {
        String url = getUserUrl + "&user_ids={userId}&fields=" + VkUser.PHOTO_FIELD_NAME;
        var typeRef = new ParameterizedTypeReference<VkResponse<List<VkUser>>>() {
        };
        var vkResponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                typeRef,
                id
        ).getBody();
        return Objects.requireNonNull(vkResponse).value().get(0);
    }
}
