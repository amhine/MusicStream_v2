package com.musicstream.repository;

import com.musicstream.model.Category;
import com.musicstream.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByArtist(String artist);
    List<Song> findByCategory(Category category);
}

