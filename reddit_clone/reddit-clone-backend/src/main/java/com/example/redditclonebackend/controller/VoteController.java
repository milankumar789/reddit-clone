package com.example.redditclonebackend.controller;

import com.example.redditclonebackend.dto.VoteRequest;
import com.example.redditclonebackend.entity.Post;
import com.example.redditclonebackend.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VoteController {

    private final VoteService voteService;

    @PostMapping
    public Post vote(@RequestBody VoteRequest request) {

        return voteService.vote(request);
    }
}