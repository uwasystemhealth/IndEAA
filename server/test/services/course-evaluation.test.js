const assert = require('assert');
const app = require('../../src/app');

describe('\'courseEvaluation\' service', () => {
    it('registered the service', () => {
        const service = app.service('course-evaluation');
        assert.ok(service, 'Registered the service');
    });
});
