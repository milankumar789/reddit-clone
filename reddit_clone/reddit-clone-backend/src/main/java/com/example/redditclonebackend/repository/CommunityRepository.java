package com.example.redditclonebackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.redditclonebackend.entity.Community;

public interface CommunityRepository
        extends JpaRepository<Community, Long> {

    Optional<Community> findBySlug(String slug);
}