import { createAction, props } from '@ngrx/store';
import { Track } from '../core/models/track';

export const loadSongs = createAction('[Song List] Load Songs');

export const loadSongsSuccess = createAction(
  '[Song List] Load Songs Success',
  props<{ songs: Track[] }>()
);

export const loadSongsFailure = createAction(
  '[Song List] Load Songs Failure',
  props<{ error: string }>()
);
