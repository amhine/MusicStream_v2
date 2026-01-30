import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { lastValueFrom } from 'rxjs'; // <--- Mohim jiddan bach tkhdem b await

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/songs'; // URL Backend

  tracks = signal<Track[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadTracks();
  }

  // 1. Charger la liste
  async loadTracks() {
    this.loading.set(true);
    try {
      // Kan7awlo Observable l Promise b lastValueFrom
      const data = await lastValueFrom(this.http.get<Track[]>(this.apiUrl));
      this.tracks.set(data);
    } catch (err) {
      console.error(err);
      this.error.set("Erreur de connexion au serveur");
    } finally {
      this.loading.set(false);
    }
  }

  // 2. Ajouter
  async addTrack(track: Track, file: File) {
    this.loading.set(true);
    const formData = new FormData();
    formData.append('file', file);
    const songData = {
      title: track.title,
      artist: track.artist,
      category: track.category,
      description: track.description
    };
    formData.append('song', JSON.stringify(songData));

    try {
      const savedTrack = await lastValueFrom(this.http.post<Track>(this.apiUrl, formData));
      this.tracks.update(list => [...list, savedTrack]);
    } catch (err) {
      console.error(err);
      this.error.set("Erreur d'upload");
    } finally {
      this.loading.set(false);
    }
  }

  // 3. ✅ GET BY ID (Hadi li kant na9sa)
  async getTrackById(id: number): Promise<Track | undefined> {
    try {
      return await lastValueFrom(this.http.get<Track>(`${this.apiUrl}/${id}`));
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  // 4. ✅ UPDATE (Hadi li kant na9sa)
  async updateTrack(track: Track): Promise<Track | undefined> {
    this.loading.set(true);
    const formData = new FormData();
    // Hna ma3ndnach fichier f update simple, donc knsyfto ghir JSON
    // Ila bghiti t-gérer fichier f update, khassk tzid parameter file
    const songData = {
      title: track.title,
      artist: track.artist,
      category: track.category,
      description: track.description
    };
    formData.append('song', JSON.stringify(songData));

    try {
      const updated = await lastValueFrom(this.http.put<Track>(`${this.apiUrl}/${track.id}`, formData));

      // Update local list
      this.tracks.update(list => list.map(t => t.id === track.id ? updated : t));
      return updated;
    } catch (err) {
      console.error(err);
      this.error.set("Erreur modification");
      return undefined;
    } finally {
      this.loading.set(false);
    }
  }

  // 5. DELETE
  async deleteTrack(id: number) {
    this.loading.set(true);
    try {
      await lastValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.tracks.update(list => list.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
