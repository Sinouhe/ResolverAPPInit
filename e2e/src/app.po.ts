import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getElementByName(text: string) {
    return element(by.name(text));
  }

  getElementByCss(text: string) {
    return element(by.css(text));
  }

}
