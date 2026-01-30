package com.backand.backand;


import com.musicstream.dto.SongCreateDTO;
import com.musicstream.dto.SongDTO;
import com.musicstream.model.Category;
import com.musicstream.model.Song;
import com.musicstream.repository.SongRepository;
import com.musicstream.service.SongService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SongServiceTest {

    @Mock
    private SongRepository songRepository;

    @InjectMocks
    private SongService songService;

    private Song song;
    private SongDTO songDTO;
    private SongCreateDTO songCreateDTO;

    @BeforeEach
    void setUp() {
        song = new Song();
        song.setId(1L);
        song.setTitle("Test Song");
        song.setArtist("Test Artist");
        song.setCategory(Category.POP);
        songCreateDTO = new SongCreateDTO();
        songCreateDTO.setTitle("Test Song");
        songCreateDTO.setArtist("Test Artist");
        songCreateDTO.setCategory(Category.POP);
    }

    @Test
    void getAllSongs_ShouldReturnListOfSongs() {
        when(songRepository.findAll()).thenReturn(Arrays.asList(song));

        List<SongDTO> result = songService.getAllSongs();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Song", result.get(0).getTitle());
        verify(songRepository, times(1)).findAll();
    }

    @Test
    void getSongById_ShouldReturnSong_WhenIdExists() {
        when(songRepository.findById(1L)).thenReturn(Optional.of(song));
        SongDTO result = songService.getSongById(1L);
        assertNotNull(result);
        assertEquals(song.getTitle(), result.getTitle());
    }

    @Test
    void getSongById_ShouldThrowException_WhenIdDoesNotExist() {
        when(songRepository.findById(99L)).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () -> {
            songService.getSongById(99L);
        });

        assertTrue(exception.getMessage().contains("Song not found"));
    }

    @Test
    void saveSong_ShouldSaveAndReturnSong() throws IOException {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.mp3",
                "audio/mpeg",
                "dummy content".getBytes()
        );

        when(songRepository.save(any(Song.class))).thenAnswer(invocation -> {
            Song savedSong = invocation.getArgument(0);
            savedSong.setId(1L);
            return savedSong;
        });

        SongDTO result = songService.saveSong(songCreateDTO, file);
        assertNotNull(result);
        assertEquals("Test Song", result.getTitle());
        assertNotNull(result.getSongUrl());
        assertTrue(result.getSongUrl().contains("test.mp3"));

        verify(songRepository, times(1)).save(any(Song.class));
    }

    @Test
    void saveSong_ShouldThrowException_WhenFileIsNull() {
        assertThrows(IOException.class, () -> {
            songService.saveSong(songCreateDTO, null);
        });
        verify(songRepository, never()).save(any(Song.class));
    }

    @Test
    void updateSong_ShouldUpdateFields() throws IOException {
        when(songRepository.findById(1L)).thenReturn(Optional.of(song));
        when(songRepository.save(any(Song.class))).thenReturn(song);

        SongCreateDTO updateDTO = new SongCreateDTO();
        updateDTO.setTitle("Updated Title");
        updateDTO.setArtist("Updated Artist");

        SongDTO result = songService.updateSong(1L, updateDTO, null);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Artist", result.getArtist());
        verify(songRepository, times(1)).save(any(Song.class));
    }

    @Test
    void deleteSong_ShouldCallRepository() {
        songService.deleteSong(1L);
        verify(songRepository, times(1)).deleteById(1L);
    }
}