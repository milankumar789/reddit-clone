package com.example.redditclonebackend.repository;

import com.example.redditclonebackend.entity.Community;
import com.example.redditclonebackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByCommunity(Community community);
}