const app = require('../../src/app');

describe('\'review\' service', () => {
    it('registered the service', () => {
        const service = app.service('review');
        expect(service).toBeTruthy();
    });
});
