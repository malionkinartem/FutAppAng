import { FutAppPage } from './app.po';

describe('fut-app App', () => {
  let page: FutAppPage;

  beforeEach(() => {
    page = new FutAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
