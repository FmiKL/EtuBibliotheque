package com.openclassrooms.etudiant.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class JwtServiceTest {
    private static final String LOGIN = "LOGIN";
    private static final String SECRET = "12345678901234567890123456789012";
    private static final long EXPIRATION = 3600000L;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private JwtService jwtService;

    @BeforeEach
    public void beforeEach() {
        // Remplace les valeurs normalement injectées depuis application.yml
        ReflectionTestUtils.setField(jwtService, "secret", SECRET);
        ReflectionTestUtils.setField(jwtService, "expiration", EXPIRATION);
    }

    @Test
    public void test_generate_token() {
        // GIVEN
        when(userDetails.getUsername()).thenReturn(LOGIN);

        // WHEN
        String token = jwtService.generateToken(userDetails);

        // THEN
        assertThat(token).isNotBlank();
    }

    @Test
    public void test_extract_username() {
        // GIVEN
        when(userDetails.getUsername()).thenReturn(LOGIN);
        String token = jwtService.generateToken(userDetails);

        // WHEN
        String username = jwtService.extractUsername(token);

        // THEN
        assertThat(username).isEqualTo(LOGIN);
    }

    @Test
    public void test_valid_token() {
        // GIVEN
        when(userDetails.getUsername()).thenReturn(LOGIN);
        String token = jwtService.generateToken(userDetails);

        // WHEN
        boolean valid = jwtService.isTokenValid(token, userDetails);

        // THEN
        assertThat(valid).isTrue();
    }
}
