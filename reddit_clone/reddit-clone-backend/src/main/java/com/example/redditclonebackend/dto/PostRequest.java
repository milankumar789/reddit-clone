package com.example.redditclonebackend.dto;

import lombok.Data;

@Data
public class PostRequest {

    private String title;

    private String content;

    private String imageUrl;

    private Long communityId;

    private Long userId;
}