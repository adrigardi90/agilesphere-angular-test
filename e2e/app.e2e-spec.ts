import { AppPage } from './app.po';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Search valid city', async () => {
    expect(page);

    await page.navigateTo();
    await page.searchWeather('Madrid');

    const data = await page.getWeatherTableData();
    expect(data[0]).toEqual('Madrid');
  });

  it('Search invalid city', async () => {
    expect(page);

    await page.navigateTo();
    await page.searchWeather('asdfffff');

    const data = await page.getWeatherTableData();
    expect(data.length).toEqual(0);
  });
});
