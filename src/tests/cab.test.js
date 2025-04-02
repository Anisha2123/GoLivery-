


const request = require('supertest');
const app = require('../server');

describe('Cab API Tests', () => {
    it('should return all available cabs', async () => {
        const res = await request(app).get('/api/cabs');
        expect(res.statusCode).toBe(200);
    });
});
