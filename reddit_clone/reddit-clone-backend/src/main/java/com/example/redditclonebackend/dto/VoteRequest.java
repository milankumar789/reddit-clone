package com.example.redditclonebackend.dto;

import lombok.Data;

@Data
public class VoteRequest {

    private String type;

    private Long postId;

    private Long userId;
}