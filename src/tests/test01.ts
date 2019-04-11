import * as webdriver from 'selenium-webdriver';
import * as moment from 'moment';
import * as fs from 'fs';

import * as enviroment from '../configurations/enviroment';
import * as commonUtility from '../utilities/common';

export default () => {
  // jest timeout setting
  jest.setTimeout(30000);

  describe('test 01', () => {
    let driver: webdriver.ThenableWebDriver;

    // get driver
    beforeAll(() => {
      driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    });

    it('search [selenium node]', async () => {
      // move page & input text & click
      await driver.get('https://www.google.com/?hl=ja');
      await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).sendKeys('selenium node');
      await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click();
    });

    it('getResultCount', async done => {
      // get text
      await driver
        .findElement(webdriver.By.xpath('//*[@id="resultStats"]'))
        .getText()
        .then(text => {
          console.log(text);
          expect(text).toBeDefined();
          done();
        });
    });

    it('screen shot', async done => {
      // get screen shot
      await driver.takeScreenshot().then(image => {
        const date = moment().format('YYYYMMDD_HHmmss');
        const filePath = commonUtility.joinPathAndName(enviroment.screenShotPath, `${date}_screen.png`);
        fs.writeFileSync(filePath, image, 'base64');
        done();
      });
    });

    it('sleep', async done => {
      setTimeout(() => {
        console.log('sleeped.');
        done();
      }, 5000);
    });

    // driver close
    afterAll(() => {
      driver.close();
    });
  });
};
