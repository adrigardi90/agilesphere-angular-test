import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainerComponent } from './weather.container';
import { Store, StoreModule } from '@ngrx/store';
import { WeatherState, reducers, Search } from './store';

describe('WeatherContainer', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;
  let store: Store<WeatherState>;

  const initalState = {
    weather: {
      cities: []
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainerComponent],
      imports: [
        StoreModule.forRoot({ 'weather': reducers }, { initialState: initalState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to search the city weather', () => {
    const action = new Search('test');
    component._onSearch('test');
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
