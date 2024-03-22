package com.example.site.dto;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Users")
public class User implements UserDetails {
    public enum Role {
        USER,
        ADMIN;

        private static final String PREFIX = "ROLE_";
    }

    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    @Basic(optional = false)
    private Role role;

    public User() {
    }

    public User(long id, Role role) {
        this.id = id;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    // not actual now
    @Override
    public String getUsername() {
        return String.valueOf(id);
    }

    // not actual now
    @Override
    public String getPassword() {
        return getUsername();
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof User other && this.id.equals(other.id);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(Role.PREFIX + role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
