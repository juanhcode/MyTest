const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)


describe('Test crear casos de prueba', () => {
    it('Post', async () => {
        const res = await app
            .post('/v1/caso')
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElements(['Alta', 'Media', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id:2
            });
        expect(res.statusCode).toEqual(201);
    });
    
})
afterAll(async () => {
    server.close();
});