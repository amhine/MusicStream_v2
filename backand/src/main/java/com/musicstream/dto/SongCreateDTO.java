package com.musicstream.dto;

import com.musicstream.model.Category;
import lombok.Data;

@Data
public class SongCreateDTO {
    private String title;
    private String artist;
    private Category category;
    private String description;
}
