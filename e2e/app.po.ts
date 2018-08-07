import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  async searchWeather(city: string) {
    await element(by.css('input#city')).sendKeys(city);
    await element(by.css('.btn-search')).click();
  }

  getWeatherTableData() {
    return element.all(by.css('td')).getText();
  }
}
