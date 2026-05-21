package com.example.redditclonebackend.dto;

import lombok.Data;

@Data
public class CommunityRequest {

    private String name;

    private String slug;

    private String description;
}