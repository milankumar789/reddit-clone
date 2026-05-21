package com.example.redditclonebackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.redditclonebackend.dto.PostRequest;
import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.repository.PostRepository;
import com.example.redditclonebackend.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PostController {

    private final PostService postService;
    @Autowired
private PostRepository postRepository;

    @PostMapping
    public Post createPost(@RequestBody PostRequest request) {

        return postService.createPost(request);
    }

    @GetMapping
    public List<Post> getAllPosts() {

        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {

        return postService.getPostById(id);
    }

    @GetMapping("/community/{communityId}")
    public List<Post> getPostsByCommunity(@PathVariable Long communityId) {

        return postService.getPostsByCommunity(communityId);
    }
    @PutMapping("/{id}")
public Post updatePost(
        @PathVariable Long id,
        @RequestBody Post updatedPost
) {

    Post existing = postRepository.findById(id)
            .orElseThrow();

    existing.setTitle(updatedPost.getTitle());

    existing.setContent(updatedPost.getContent());

    return postRepository.save(existing);
}

@DeleteMapping("/{id}")
public void deletePost(@PathVariable Long id) {

    postRepository.deleteById(id);
}
}