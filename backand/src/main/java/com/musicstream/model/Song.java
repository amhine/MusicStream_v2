package com.musicstream.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "songs")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;
    @NotBlank
    private String artist;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String description;

    @NotBlank
    private String songUrl;
}

