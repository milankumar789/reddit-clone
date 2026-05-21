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

import com.example.redditclonebackend.dto.CommentRequest;
import com.example.redditclonebackend.entity.Comment;
import com.example.redditclonebackend.repository.CommentRepository;
import com.example.redditclonebackend.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;
    @Autowired
private CommentRepository commentRepository;

    @PostMapping
    public Comment createComment(@RequestBody CommentRequest request) {

        return commentService.createComment(request);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getComments(@PathVariable Long postId) {

        return commentService.getCommentsByPost(postId);
    }
    @PutMapping("/{id}")
public Comment updateComment(
        @PathVariable Long id,
        @RequestBody Comment updatedComment
) {

    Comment existing = commentRepository.findById(id)
            .orElseThrow();

    existing.setContent(updatedComment.getContent());

    return commentRepository.save(existing);
}
@DeleteMapping("/{id}")
public void deleteComment(@PathVariable Long id) {

    commentRepository.deleteById(id);
}
}