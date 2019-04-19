import * as jest from 'jest';
import chrome from './tests/selenium/chrome';
import puppeteer from './tests/puppeteer';

describe('TEST Start Selenium', () => {
  chrome();
});

describe('TEST Start puppeteer', () => {
  puppeteer();
});
