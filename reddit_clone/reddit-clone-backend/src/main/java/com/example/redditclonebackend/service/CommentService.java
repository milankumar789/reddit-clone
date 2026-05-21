package com.example.redditclonebackend.service;

import com.example.redditclonebackend.dto.CommentRequest;
import com.example.redditclonebackend.entity.Comment;
import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.entity.User;
import com.example.redditclonebackend.repository.CommentRepository;
import com.example.redditclonebackend.repository.PostRepository;
import com.example.redditclonebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public Comment createComment(CommentRequest request) {

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .post(post)
                .author(user)
                .createdAt(LocalDateTime.now())
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPost(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPost(post);
    }
}