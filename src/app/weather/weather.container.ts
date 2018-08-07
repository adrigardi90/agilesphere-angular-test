import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { Store } from '@ngrx/store';
import { Weather, WeatherList } from '../model/weather';
import { SEARCH } from './store/actions/weather';
import { Search, getWeather, AppState, WeatherState } from './store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weather',
  template: `
    <app-search
      (searched)="_onSearch($event)">
      </app-search>
    <app-results
      [cities]="cities$ | async">
    </app-results>  `
})
export class WeatherContainerComponent {

  cities$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.cities$ = this.store.select<any>(getWeather);
  }

  /**
   * Dispatch the action to search the weather
   * @param city
   */
  _onSearch(city) {
    this.store.dispatch(new Search(city));
  }
}
