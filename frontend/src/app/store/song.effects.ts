import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrackService } from '../core/services/track.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as SongActions from './song.actions';
import { Track } from '../core/models/track';

@Injectable()
export class SongEffects {
  constructor(private actions$: Actions, private trackService: TrackService) {
  }

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
      mergeMap(() =>
        this.trackService.getAllTracks().pipe(
          map((songs) => SongActions.loadSongsSuccess({songs: songs as any})),
          catchError((error) =>
            of(SongActions.loadSongsFailure({error: error.message}))
          )
        )
      )
    )
  );
}
