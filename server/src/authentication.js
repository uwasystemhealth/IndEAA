const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');

const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GoogleStrategy extends OAuthStrategy {
  // EXTENDS FUNCTIONALITY OF THE GET ENTITY
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    return {
      ...baseData,
      ...profile
    };
    /*
    Sample Data from profile:
    {
      sub: '104769269446538156199',
      name: 'Frinze Lapuz',
      given_name: 'Frinze',
      family_name: 'Lapuz',
      picture: 'https://lh6.googleusercontent.com/-E14izPkK_2I/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnCwpFyWJ92hjCyXfXMOE52-cld0w/s96-c/photo.jpg',
      email: '22711649@student.uwa.edu.au',
      email_verified: true,
      locale: 'en-GB',
      hd: 'student.uwa.edu.au'

      }
  */
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register("google", new GoogleStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
