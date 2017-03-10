import { FakenewsPage } from './app.po';

describe('fakenews App', () => {
  let page: FakenewsPage;

  beforeEach(() => {
    page = new FakenewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
