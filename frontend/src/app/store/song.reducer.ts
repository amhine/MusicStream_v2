import { createReducer, on } from '@ngrx/store';
import { loadSongs, loadSongsSuccess, loadSongsFailure } from './song.actions';
import { Track } from '../core/models/track';

export interface SongState {
  songs: Track[];
  loading: boolean;
  error: string | null;
}

export const initialState: SongState = {
  songs: [],
  loading: false,
  error: null
};

export const songReducer = createReducer(
  initialState,
  on(loadSongs, (state) => ({ ...state, loading: true })),

  on(loadSongsSuccess, (state, { songs }) => ({
    ...state,
    loading: false,
    songs: songs,
    error: null
  })),

  on(loadSongsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
