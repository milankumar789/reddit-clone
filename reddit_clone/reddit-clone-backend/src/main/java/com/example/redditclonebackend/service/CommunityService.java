package com.example.redditclonebackend.service;

import com.example.redditclonebackend.dto.CommunityRequest;
import com.example.redditclonebackend.entity.Community;
import com.example.redditclonebackend.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public Community createCommunity(CommunityRequest request) {

        Community community = Community.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .build();

        return communityRepository.save(community);
    }

    public List<Community> getAllCommunities() {

        return communityRepository.findAll();
    }

    public Community getCommunityBySlug(String slug) {

        return communityRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Community not found"));
    }
}