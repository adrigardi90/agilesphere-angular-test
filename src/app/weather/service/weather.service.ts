import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

import { Weather, WeatherList } from '../../model/weather';

@Injectable()
export class WeatherService {

  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951',
    mode: 'json'
  };

  constructor(private http: HttpClient) { }

  /**
   * Search the weather for the city
   * @param city, string to search by
   */
  searchWeatherForCity = (city: string): Observable<Weather> => (
    this.http.get<Weather>(
      `${this.url}?APPID=${this.params.APPID}&units=${this.params.units}&q=${city}&mode=${this.params.mode}&cnt=${this.params.cnt}`)
  )

  /**
   * Create the object to store
   * @param data
   */
  mapData = (data: Weather) => ({
    city: data.city.name,
    list: this.getTimeWeather(data.list)
  })

  /**
   * Get the weather for the following hours and
   * sort them from 00am to 06pm
   * @param list
   */
  private getTimeWeather = (list: WeatherList[]) => (
    list.filter((weather: WeatherList) => (
      this.getHour(weather.dt) % 6 === 0
    )).map((weather: WeatherList) => ({
      time: this.getHour(weather.dt),
      temp: weather.main.temp,
    })).sort((a, b) => a.time - b.time)
  )

  /**
   * Get the hour based on the timestamp
   * @param timestamp
   */
  private getHour = (timestamp: number) => (
    +(new Date(timestamp * 1000).getHours() - 1)
  )

}
