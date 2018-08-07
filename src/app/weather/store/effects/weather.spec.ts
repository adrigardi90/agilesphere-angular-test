import { TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ToastContainerModule, ToastrService, ToastrModule } from 'ngx-toastr';
import { hot, cold } from 'jasmine-marbles';
import { instance, mock, when } from 'ts-mockito';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { WeatherEffects } from './weather';
import * as MyActions from '../actions/weather';
import { WeatherService } from '../../service/weather.service';
import { Weather } from '../../../model/weather';


const weatherApiResponseMock: Weather = {
  'cod': '200',
  'message': 0.0028,
  'cnt': 8,
  'list': [
    { 'dt': 1533664800, 'main': { 'temp': 33.08, 'temp_min': 33.08, 'temp_max': 33.43, 'pressure': 951.99, 'sea_level': 1022.35, 'grnd_level': 951.99, 'humidity': 17, 'temp_kf': -0.35 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 5.02, 'deg': 253.001 }, 'sys': { 'pod': 'd' }, 'dt_txt': '2018-08-07 18:00:00' },
    { 'dt': 1533675600, 'main': { 'temp': 24.26, 'temp_min': 24.26, 'temp_max': 24.53, 'pressure': 953.11, 'sea_level': 1023.98, 'grnd_level': 953.11, 'humidity': 24, 'temp_kf': -0.26 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 3.12, 'deg': 250.5 }, 'sys': { 'pod': 'n' }, 'dt_txt': '2018-08-07 21:00:00' },
    { 'dt': 1533686400, 'main': { 'temp': 18.26, 'temp_min': 18.26, 'temp_max': 18.43, 'pressure': 953.49, 'sea_level': 1024.7, 'grnd_level': 953.49, 'humidity': 51, 'temp_kf': -0.18 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 1.26, 'deg': 241.002 }, 'sys': { 'pod': 'n' }, 'dt_txt': '2018-08-08 00:00:00' },
    { 'dt': 1533697200, 'main': { 'temp': 15.69, 'temp_min': 15.69, 'temp_max': 15.78, 'pressure': 953.68, 'sea_level': 1024.89, 'grnd_level': 953.68, 'humidity': 64, 'temp_kf': -0.09 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 1.76, 'deg': 134.001 }, 'sys': { 'pod': 'n' }, 'dt_txt': '2018-08-08 03:00:00' },
    { 'dt': 1533708000, 'main': { 'temp': 14.5, 'temp_min': 14.5, 'temp_max': 14.5, 'pressure': 954.24, 'sea_level': 1025.57, 'grnd_level': 954.24, 'humidity': 84, 'temp_kf': 0 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 1.13, 'deg': 106.501 }, 'sys': { 'pod': 'd' }, 'dt_txt': '2018-08-08 06:00:00' },
    { 'dt': 1533718800, 'main': { 'temp': 26.42, 'temp_min': 26.42, 'temp_max': 26.42, 'pressure': 954.9, 'sea_level': 1025.73, 'grnd_level': 954.9, 'humidity': 49, 'temp_kf': 0 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 2.04, 'deg': 147.002 }, 'sys': { 'pod': 'd' }, 'dt_txt': '2018-08-08 09:00:00' },
    { 'dt': 1533729600, 'main': { 'temp': 32.53, 'temp_min': 32.53, 'temp_max': 32.53, 'pressure': 953.61, 'sea_level': 1023.98, 'grnd_level': 953.61, 'humidity': 28, 'temp_kf': 0 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 2.83, 'deg': 232.003 }, 'sys': { 'pod': 'd' }, 'dt_txt': '2018-08-08 12:00:00' },
    { 'dt': 1533740400, 'main': { 'temp': 34.71, 'temp_min': 34.71, 'temp_max': 34.71, 'pressure': 951.43, 'sea_level': 1021.77, 'grnd_level': 951.43, 'humidity': 23, 'temp_kf': 0 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d' }], 'clouds': { 'all': 0 }, 'wind': { 'speed': 5.18, 'deg': 239.003 }, 'sys': { 'pod': 'd' }, 'dt_txt': '2018-08-08 15:00:00' }],
  'city': {
    'id': 3117735,
    'name': 'Madrid',
    'coord': { 'lat': 40.4167, 'lon': -3.7036 },
    'country': 'ES',
    'population': 1000000
  }
};

describe('My Effects', () => {
  let actions$: Observable<Action>;
  let effects: WeatherEffects;
  const weatherServiceMock = mock(WeatherService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        WeatherEffects,
        { provide: WeatherService, useFactory: () => instance(weatherServiceMock) },
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.get(WeatherEffects);
  });

  it('Search weather effect working', () => {
    const filterMock = { city: 'Madrid', list: [] };
    actions$ = hot('a', { a: new MyActions.Search('Madrid') });
    const expected = cold('b', { b: new MyActions.Add(filterMock) });
    when(weatherServiceMock.searchWeatherForCity('Madrid')).thenReturn(of(weatherApiResponseMock));
    when(weatherServiceMock.mapData(weatherApiResponseMock)).thenReturn(filterMock);
    expect(effects.loadWeather$).toBeObservable(expected);
  });

  // TODO: it does not trigger the error
  // it('Search weather effect error', () => {
  //   actions$ = hot('a', { a: new MyActions.Search('Madrid') });
  //   const expected = cold('b', { b: new MyActions.Error() });
  //   when(weatherServiceMock.searchWeatherForCity('Madrid')).thenReturn(new ErrorObservable('Error'));
  //   expect(effects.loadWeather$).toBeObservable(expected);
  // });
});
