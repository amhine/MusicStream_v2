package com.musicstream.dto;

import com.musicstream.model.Category;
import lombok.Data;

@Data
public class SongDTO {
    private Long id;
    private String title;
    private String artist;
    private Category category;
    private String description;
    private String songUrl;
}
