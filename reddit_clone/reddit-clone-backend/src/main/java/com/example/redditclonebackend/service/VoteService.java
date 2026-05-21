package com.example.redditclonebackend.service;

import com.example.redditclonebackend.dto.VoteRequest;
import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.entity.User;
import com.example.redditclonebackend.entity.Vote;
import com.example.redditclonebackend.repository.PostRepository;
import com.example.redditclonebackend.repository.UserRepository;
import com.example.redditclonebackend.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public Post vote(VoteRequest request) {

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vote existingVote = voteRepository.findByUserAndPost(user, post)
                .orElse(null);

        if (existingVote != null) {
            voteRepository.delete(existingVote);

            if (existingVote.getType().equals("UPVOTE")) {
                post.setVoteCount(post.getVoteCount() - 1);
            } else {
                post.setVoteCount(post.getVoteCount() + 1);
            }
        }

        Vote vote = Vote.builder()
                .type(request.getType())
                .post(post)
                .user(user)
                .build();

        voteRepository.save(vote);

        if (request.getType().equals("UPVOTE")) {
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }

        return postRepository.save(post);
    }
}