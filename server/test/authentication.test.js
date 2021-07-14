const assert = require('assert');
const app = require('../src/app');
const { userGenerator, dropDatabase } = require('./utils');

describe('authentication', () => {
    it('registered the authentication service', () => {
        assert.ok(app.service('authentication'));
    });
    // describe('local strategy', () => {
    //     const userInfo = userGenerator({ email: 'auth@test.com' });

    //     before(()=> dropDatabase(app));
    //     it('authenticates user and creates accessToken', async () => {
    //         await app.service('users').create(userInfo);

    //         const { user, accessToken } = await app.service('authentication').create({
    //             strategy: 'local',
    //             ...userInfo,
    //         });
    //         assert.ok(accessToken, 'Created access token for user');
    //         assert.ok(user, 'Includes user in authentication data');
    //     });
    // });
});
