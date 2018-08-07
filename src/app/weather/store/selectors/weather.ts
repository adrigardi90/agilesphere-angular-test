
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState, AppState } from '..';

export const getWeatherState = createFeatureSelector<WeatherState>('weather');

export const getWeather = createSelector(
  getWeatherState,
  (state: WeatherState) => state.cities
);
