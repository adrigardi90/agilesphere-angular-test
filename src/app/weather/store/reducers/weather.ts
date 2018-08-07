import { Weather } from '../../../model/weather';
import { SEARCH, ADD, ERROR } from '../actions/weather';

export interface AppState {
  weather: any;
}
export interface WeatherState {
  cities: any[];
}

export const initialWeatherState: WeatherState = {
  cities: []
};

export const reducers = (state: WeatherState = initialWeatherState, action) => {
  switch (action.type) {
    case ADD:
      return { cities: [...state.cities, action.payload] };
    case SEARCH:
      return state;
    case ERROR:
      return state;
    default:
      return state;
  }
};

