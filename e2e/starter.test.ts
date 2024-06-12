import { device, expect } from 'detox';

// hard to test with CoinGecko API limits
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should open detail', async () => {
    await element(by.text('1')).tap();
    await element(by.text('USD')).tap();
    await element(by.text('EUR')).tap();
    await expect(element(by.text('€'))).toBeVisible();
  });

  it('should search bitcoin', async () => {
    await element(by.text('Search')).tap();
    await element(by.text('Search coins')).typeText('bitcoin');
    await expect(element(by.text('Bitcoin'))).toBeVisible();
  });
});
