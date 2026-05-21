package com.example.redditclonebackend.service;

import com.example.redditclonebackend.dto.PostRequest;
import com.example.redditclonebackend.entity.Community;
import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.entity.User;
import com.example.redditclonebackend.repository.CommunityRepository;
import com.example.redditclonebackend.repository.PostRepository;
import com.example.redditclonebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final CommunityRepository communityRepository;

    private final UserRepository userRepository;

    public Post createPost(PostRequest request) {

        Community community = communityRepository.findById(request.getCommunityId())
                .orElseThrow(() -> new RuntimeException("Community not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .community(community)
                .author(user)
                .createdAt(LocalDateTime.now())
                .voteCount(0)
                .build();

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {

        return postRepository.findAll();
    }

    public Post getPostById(Long id) {

        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Post> getPostsByCommunity(Long communityId) {

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        return postRepository.findByCommunity(community);
    }
}