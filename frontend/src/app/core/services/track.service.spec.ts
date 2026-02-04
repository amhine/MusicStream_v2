import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, fakeAsync, tick } from '@angular/core/testing'; // Import fakeAsync and tick
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { Track } from '../models/track';

describe('TrackService', () => {
  let service: TrackService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/songs';

  const mockTracks: Track[] = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', category: 'Pop', songUrl: 'url1', description: 'desc' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', category: 'Rock', songUrl: 'url2', description: 'desc' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService],
    });

    service = TestBed.inject(TrackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // Flush the constructor request
    const req = httpMock.expectOne(apiUrl);
    req.flush([]);
  });


  it('should add a track', () => {
    const newTrack: Track = {
      id: 3,
      title: 'New',
      artist: 'New',
      category: 'Jazz',
      songUrl: 'new',
      description: '',
    };
    const file = new File([''], 'song.mp3');

    const initReq = httpMock.expectOne(apiUrl);
    initReq.flush([]);

    service.addTrack(newTrack, file);

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newTrack);
  });
});
