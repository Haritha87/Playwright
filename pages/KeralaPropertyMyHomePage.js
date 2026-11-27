export class KeralaPropertyMyHomePage {
  constructor(page) {
    this.myHomeHeading = page.getByRole('heading', { name: 'My home', exact: true });
  }
}
