package com.musicstream.service;

import com.musicstream.dto.SongCreateDTO;
import com.musicstream.dto.SongDTO;
import com.musicstream.model.Song;
import com.musicstream.repository.SongRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SongService {

    private final SongRepository songRepository;

    private final Path fileStorageLocation;

    public SongService(SongRepository songRepository) throws IOException {
        this.songRepository = songRepository;

        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    public List<SongDTO> getAllSongs() {
        return songRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SongDTO saveSong(SongCreateDTO createDTO, MultipartFile file) throws IOException {
        Song song = new Song();

        BeanUtils.copyProperties(createDTO, song);

        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            song.setSongUrl(fileName);
        } else {
            throw new IOException("Fichier drouri!");
        }

        Song savedSong = songRepository.save(song);
        return convertToDTO(savedSong);
    }

    private SongDTO convertToDTO(Song song) {
        SongDTO dto = new SongDTO();
        BeanUtils.copyProperties(song, dto);
       return dto;
    }

    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }

    public SongDTO getSongById(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
        return convertToDTO(song);
    }

    public SongDTO updateSong(Long id, SongCreateDTO songDTO, MultipartFile file) throws IOException {
        Song existingSong = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
        existingSong.setTitle(songDTO.getTitle());
        existingSong.setArtist(songDTO.getArtist());
        existingSong.setCategory(songDTO.getCategory());
        existingSong.setDescription(songDTO.getDescription());
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            existingSong.setSongUrl(fileName);
        }

        Song updatedSong = songRepository.save(existingSong);
        return convertToDTO(updatedSong);
    }
    private Song convertToEntity(SongDTO dto) {
        Song song = new Song();
        BeanUtils.copyProperties(dto, song);
        return song;
    }
}