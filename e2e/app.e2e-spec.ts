import { PantintPage } from './app.po';

describe('pantint App', () => {
  let page: PantintPage;

  beforeEach(() => {
    page = new PantintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
