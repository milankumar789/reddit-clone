package com.example.redditclonebackend.controller;

import com.example.redditclonebackend.dto.AuthResponse;
import com.example.redditclonebackend.dto.LoginRequest;
import com.example.redditclonebackend.dto.RegisterRequest;
import com.example.redditclonebackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        return authService.login(request);
    }
}