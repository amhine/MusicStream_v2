import { createAction, props } from '@ngrx/store';
import { Song } from '../models/song.model';

export const loadSongs = createAction('[Song List] Load Songs');

export const loadSongsSuccess = createAction(
  '[Song List] Load Songs Success',
  props<{ songs: Song[] }>()
);

export const loadSongsFailure = createAction(
  '[Song List] Load Songs Failure',
  props<{ error: string }>()
);
