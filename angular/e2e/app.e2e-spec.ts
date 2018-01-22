import { GswPage } from './app.po';

describe('gsw App', () => {
  let page: GswPage;

  beforeEach(() => {
    page = new GswPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
