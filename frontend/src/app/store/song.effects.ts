import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MusicService } from '../services/music.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as SongActions from './song.actions';

@Injectable()
export class SongEffects {
  constructor(private actions$: Actions, private musicService: MusicService) {}

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
      mergeMap(() =>
        this.musicService.getAllSongs().pipe(
          map((songs) => SongActions.loadSongsSuccess({ songs })),
          catchError((error) =>
            of(SongActions.loadSongsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
