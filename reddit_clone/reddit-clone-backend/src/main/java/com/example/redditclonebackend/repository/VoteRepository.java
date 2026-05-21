package com.example.redditclonebackend.repository;

import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.entity.User;
import com.example.redditclonebackend.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserAndPost(User user, Post post);
}