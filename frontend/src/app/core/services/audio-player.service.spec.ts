import { expect, describe, it, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AudioPlayerService } from './audio-player.service';
import { Track } from '../models/track';
import { vi } from 'vitest'; // <--- DAROORI: Import dyal Vitest

describe('AudioPlayerService', () => {
  let service: AudioPlayerService;

  const mockTrack1: Track = { id: 1, title: 'T1', artist: 'A1', songUrl: 'file1.mp3', category: 'Pop', description: '' };
  const mockTrack2: Track = { id: 2, title: 'T2', artist: 'A2', songUrl: 'file2.mp3', category: 'Pop', description: '' };
  const mockTrack3: Track = { id: 3, title: 'T3', artist: 'A3', songUrl: 'file3.mp3', category: 'Pop', description: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioPlayerService]
    });
    service = TestBed.inject(AudioPlayerService);

    // MOCKING AUDIO AVEC VITEST
    const audioMock = (service as any).audio;

    // CORRECTION HNA: "vi.spyOn" blast "spyOn"
    // w ".mockResolvedValue" blast ".and.returnValue"
    vi.spyOn(audioMock, 'play').mockImplementation(() => Promise.resolve());
    vi.spyOn(audioMock, 'pause').mockImplementation(() => {});
    vi.spyOn(audioMock, 'load').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play a track', () => {
    service.playTrack(mockTrack1);

    expect(service.currentTrack()).toEqual(mockTrack1);
    expect((service as any).audio.src).toContain('http://localhost:8080/api/songs/files/file1.mp3');
    expect((service as any).audio.play).toHaveBeenCalled();
  });

  it('should toggle play/pause', () => {
    const audio = (service as any).audio;

    // Force paused state
    Object.defineProperty(audio, 'paused', { value: true, writable: true });
    service.togglePlay();
    expect(audio.play).toHaveBeenCalled();

    // Force playing state
    Object.defineProperty(audio, 'paused', { value: false, writable: true });
    service.togglePlay();
    expect(audio.pause).toHaveBeenCalled();
  });

  it('should go to next track', () => {
    service.setPlaylist([mockTrack1, mockTrack2, mockTrack3]);

    service.playTrack(mockTrack1);

    service.next();
    expect(service.currentTrack()?.id).toBe(2);

    service.next();
    expect(service.currentTrack()?.id).toBe(3);

    service.next();
    expect(service.currentTrack()?.id).toBe(1);
  });

  it('should go to previous track', () => {
    service.setPlaylist([mockTrack1, mockTrack2, mockTrack3]);

    service.playTrack(mockTrack2);

    service.previous();
    expect(service.currentTrack()?.id).toBe(1);

    service.previous();
    expect(service.currentTrack()?.id).toBe(3);
  });

  it('should set volume', () => {
    service.setVolume(0.5);
    expect((service as any).audio.volume).toBe(0.5);
    expect(service.volume()).toBe(0.5);
  });
});
