import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromedriver from 'chromedriver';
import * as moment from 'moment';
import * as fs from 'fs';

import * as enviroment from '../configurations/enviroment';
import * as commonUtility from '../utilities/common';

export default () => {
  // jest timeout setting
  jest.setTimeout(30000);

  describe('test01.ts', () => {
    let driver: webdriver.ThenableWebDriver;

    // get driver
    beforeAll(() => {
      // setting node_modules chromedriver
      const service = new chrome.ServiceBuilder(chromedriver.path).build();
      chrome.setDefaultService(service);

      // setting chromedriver
      const capabilities = webdriver.Capabilities.chrome();
      capabilities.set('chromeOptions', {
        args: enviroment.capabilities
      });

      driver = new webdriver.Builder().withCapabilities(capabilities).build();
    });

    // driver close
    afterAll(() => {
      driver.close();
    });

    it('Search [selenium node]', async () => {
      // move page & input text & click
      await driver.get('https://www.google.com/?hl=ja');
      await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).sendKeys('selenium node');
      await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click();
    });

    it('Get Result Count Wait', async done => {
      const path = '//*[@id="resultStats"]';
      // wait
      const elment = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(path)), 10000);
      // find text
      await elment.getText().then(text => {
        console.log(text);
        expect(text).toBeDefined();
        done();
      });
    });

    it('Get Search Top Result', async done => {
      const expected = 'Nodejsを使ってSeleniumでChromeを動かす - Qiita';
      await driver
        .findElement(webdriver.By.xpath('//*[@id="rso"]/div/div/div[1]/div/div/div[1]/a/h3'))
        .getText()
        .then(text => {
          console.log(text);
          expect(text).toBe(expected);
          done();
        });
    });

    it('Get Title', async () => {
      const expected = 'selenium node - Google 検索';
      const actual = await driver.getTitle();
      console.log(actual);
      expect(expected).toBe(actual);
    });

    it('Get Screen Shot', async done => {
      await driver.takeScreenshot().then(image => {
        const date = moment().format('YYYYMMDD_HHmmss');
        const filePath = commonUtility.joinPathAndName(enviroment.screenShotPath, `${date}_screen.png`);
        fs.writeFileSync(filePath, image, 'base64');
        done();
      });
    });

    it('Sleep 5m', async done => {
      setTimeout(() => {
        console.log('sleeped.');
        done();
      }, 5000);
    });
  });
};
