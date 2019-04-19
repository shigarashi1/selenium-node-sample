import * as puppeteer from 'puppeteer';
import * as moment from 'moment';

import * as enviroment from '../configurations/enviroment';
import * as commonUtility from '../utilities/common';

const headless = true;
const slowMo = 10;
const viewport: puppeteer.Viewport = {
  width: 1280,
  height: 800
};
const args = ['--start-fullscreen', '--disable-infobars', '--incognito'];

export default () => {
  // jest timeout setting
  jest.setTimeout(30000);

  describe('puppeteer Chromium Test Start.', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    // get driver
    beforeAll(async () => {
      browser = await puppeteer.launch({ headless, slowMo });
    });

    // driver close
    afterAll(() => {
      browser.close();
    });

    it('Search [selenium node]', async done => {
      page = await browser.newPage();
      await page.setViewport(viewport);
      // move page
      await page.goto('https://www.google.com/?hl=ja');
      const inputElement = await page.$x('//*[@id="tsf"]/div[2]/div/div[1]/div/div[1]/input');
      // input text
      await inputElement[0].type('selenium node');
      const btnElement = await page.$x('//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]');
      // click
      await btnElement[0].click();
      done();
    });

    it('Get Result Count', async done => {
      const xpath = '//*[@id="resultStats"]';
      // wait
      const element = await page.waitForXPath(xpath, { timeout: 30000, visible: true });
      // find text
      const text = await page.evaluate(result => result.textContent, element);
      console.log(text);
      expect(text).toBeDefined();
      done();
    });

    it('Get Search Top Result', async done => {
      const expected = 'Nodejsを使ってSeleniumでChromeを動かす - Qiita';
      const xpath = '//*[@id="rso"]/div/div/div[1]/div/div/div[1]/a/h3';
      const element = await page.$x(xpath);
      const text = await page.evaluate(result => result.textContent, element[0]);
      expect(text).toBe(expected);
      done();
    });

    it('Get Title', async done => {
      const expected = 'selenium node - Google 検索';
      const actual = await page.title();
      console.log(actual);
      expect(expected).toBe(actual);
      done();
    });

    it('Get Screen Shot', async done => {
      const date = moment().format('YYYYMMDD_HHmmss');
      const filePath = commonUtility.joinPathAndName(enviroment.screenShotPath, `${date}_screen.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      done();
    });
  });
};
