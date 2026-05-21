package com.example.redditclonebackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.redditclonebackend.entity.Community;
import com.example.redditclonebackend.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/communities")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommunityController {

    private final CommunityRepository communityRepository;

    @GetMapping
    public List<Community> getAllCommunities() {

        return communityRepository.findAll();
    }

    @PostMapping
    public Community createCommunity(
            @RequestBody Community community
    ) {

        return communityRepository.save(community);
    }
}