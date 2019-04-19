import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to refonteCompteAppWeb!');
  });



  it('should should connect USer', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to refonteCompteAppWeb!');
    page.getElementByName('email').sendKeys('absolom2001@hotmail.com');
    page.getElementByName('password').sendKeys('221183');
    const form = page.getElementByCss('#loginForm').getAttribute('class');
    expect(form).toContain('ng-valid');
    page.getElementByCss('#loginFormSubmit').click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/profil');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });

});
