package com.example.site.service;

import com.example.site.dto.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String USER_ID = "userId";

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    private final SecretKey key;
    private final long jwtValidityDuration;
    private final JwtParser jwtParser;

    public JwtService(
            @Value("${jwt.key}") String jwtKey,
            @Value("${jwt.validity_duration_sec}") long jwtValidityDurationInSeconds
    ) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtKey));
        this.jwtValidityDuration = Duration
                .ofSeconds(jwtValidityDurationInSeconds).toMillis();
        this.jwtParser = Jwts.parser().verifyWith(this.key).build();
    }


    public String generateToken(User user) {
        return Jwts.builder()
                .claim(USER_ID, user.getId())
                .expiration(new Date(System.currentTimeMillis() + jwtValidityDuration))
                .signWith(key)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            return extractUserId(token) != null &&
                   extractClaim(token, Claims::getExpiration) != null;
        } catch (UnsupportedJwtException e) {
            logger.warn("JWT isn't signed: " + token);
            return false;
        } catch (ExpiredJwtException e) {
            logger.warn("JWT is expired: " + token);
            return false;
        } catch (JwtException e) {
            logger.warn("JWT can't be parsed: " + token);
            return false;
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = jwtParser.parseSignedClaims(token).getPayload();;
        return claimsResolver.apply(claims);
    }

    public Long extractUserId(String token) {
        return extractClaim(token, claims -> claims.get(USER_ID, Long.class));
    }
}
