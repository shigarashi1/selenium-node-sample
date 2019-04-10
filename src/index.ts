import * as webdriver from 'selenium-webdriver';
import * as moment from 'moment';
import * as fs from 'fs';

import * as enviroment from './configurations/enviroment';
import * as commonUtility from './utilities/common';

const start = async () => {
  const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

  await driver.get('https://www.google.com/?hl=ja');
  await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input')).sendKeys('selenium node');
  await driver.findElement(webdriver.By.xpath('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]')).click();

  await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]/nobr'));
  await driver
    .takeScreenshot()
    .then(image => {
      const date = moment().format('YYYYMMDD_HHmmss');
      const filePath = commonUtility.joinPathAndName(enviroment.screenShotPath, `${date}_screen.png`);
      fs.writeFileSync(filePath, image, 'base64');
      return true;
    })
    .then(value => {
      driver.close();
    });
};

start();
