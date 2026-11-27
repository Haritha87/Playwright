export class KeralaPropertyLoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#ulogin');
    this.passwordInput = page.locator('#upass');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://keralaproperty.in/member/login/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
