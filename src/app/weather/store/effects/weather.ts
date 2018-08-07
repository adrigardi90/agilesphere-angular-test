import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect , ofType} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Add, SEARCH, Error } from '../actions/weather';
import { WeatherService } from '../../service/weather.service';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WeatherEffects {

  @Effect()
  loadWeather$: Observable<Action> = this.actions$.pipe(
    ofType(SEARCH),
    map((action: any) => action.payload),
    switchMap(city =>
      this.weatherService.searchWeatherForCity(city).pipe(
        map((res) => this.weatherService.mapData(res)),
        map(this.success),
        catchError(this.error)
      )));

  constructor(private actions$: Actions,
    private weatherService: WeatherService,
    private toastr: ToastrService) { }

  /**
   * Success callback: add new weather
   */
  success = (filter: any) => {
    this.toastr.success(' City added');
    return new Add(filter);
  }

  /**
   * Error callback: error
   */
  error = (error: any) => {
    +error.error.cod === 404 ?
      this.toastr.warning(error.error.message) :
      this.toastr.error('Error');
    return of(new Error());
  }
}
