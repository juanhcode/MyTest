const request = require('supertest')
const server = require('../index')
const app = request(server)
describe('Get Endpoints', () => {
    it('Get', async () => {
        const res = await app
            .get('/')
            .send({
                name: 'test ran successfully',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('status');
    })
})
afterAll(async () => {
    server.close();
});