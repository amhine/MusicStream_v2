import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // IMPORTANT
import { Track } from '../models/track';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private http = inject(HttpClient); // Injecter HttpClient
  private apiUrl = 'http://localhost:8080/api/songs'; // URL Backend

  tracks = signal<Track[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    this.loadTracks();
  }

  async loadTracks() {
    this.loading.set(true);
    try {
      // Récupérer la liste depuis Spring Boot
      const data = await firstValueFrom(this.http.get<Track[]>(this.apiUrl));
      this.tracks.set(data);
    } catch (err) {
      console.error("Erreur chargement API", err);
    } finally {
      this.loading.set(false);
    }
  }

  // C'est ici que ça change : FORM DATA pour l'upload
  async addTrack(track: Track) {
    this.loading.set(true);
    try {
      const formData = new FormData();
      formData.append('title', track.title);
      formData.append('artist', track.artist);
      formData.append('category', track.category);

      // On envoie le fichier récupéré dans le formulaire
      if (track.file instanceof File) {
        formData.append('file', track.file);
      }

      // Envoi POST vers Spring Boot
      await firstValueFrom(this.http.post(this.apiUrl, formData));

      // Recharger la liste
      await this.loadTracks();
    } catch (err) {
      console.error("Erreur upload API", err);
    } finally {
      this.loading.set(false);
    }
  }
}
