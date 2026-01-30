package com.musicstream.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicstream.dto.SongCreateDTO;
import com.musicstream.dto.SongDTO;
import com.musicstream.service.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:4200")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("audio/mpeg"))
                        .body(resource);
            } else {
                throw new RuntimeException("Fichier ma-tlaqach");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erreur: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SongDTO>> getAllSongs() {
        return ResponseEntity.ok(songService.getAllSongs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongDTO> getSongById(@PathVariable Long id) {
        return ResponseEntity.ok(songService.getSongById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SongDTO> createSong(
            @RequestPart("song") String songString,
            @RequestPart("file") MultipartFile file
    ) throws IOException {

        SongCreateDTO songDTO = convertToSongCreateDTO(songString);

        SongDTO createdSong = songService.saveSong(songDTO, file);
        return new ResponseEntity<>(createdSong, HttpStatus.CREATED);
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SongDTO> updateSong(
            @PathVariable Long id,
            @RequestPart("song") String songString,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        SongCreateDTO songDTO = convertToSongCreateDTO(songString);
        SongDTO updatedSong = songService.updateSong(id, songDTO, file);
        return ResponseEntity.ok(updatedSong);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }
    private SongCreateDTO convertToSongCreateDTO(String songString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(songString, SongCreateDTO.class);
    }
}