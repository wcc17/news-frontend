import { NewsPage } from './app.po';

describe('news App', () => {
  let page: NewsPage;

  beforeEach(() => {
    page = new NewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
