const app = require('../../src/app');

describe('\'courseEvaluation\' service', () => {
    it('registered the service', () => {
        const service = app.service('course-evaluation');
        expect(service).toBeTruthy();
    });
});
