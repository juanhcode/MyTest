const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let jwt = process.env.TOKEN

describe('Test crear permisos', () => {
    it('Post - Permiso exitoso', async () => {
        const res = await app
            .post('/v1/permiso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
            });
        expect(res.statusCode).toEqual(201);
    });
    it('Post - Permiso fallido', async () => {
        const res = await app
            .post('/v1/permiso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({});
        expect(res.statusCode).toEqual(500);
    });
});