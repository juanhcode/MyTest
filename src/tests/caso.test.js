const faker = require('faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)


describe('Test crear casos de prueba', () => {
    it('Post', async () => {
        const res = await app
            .get('/v1/caso/')
            .send({
                nombre: faker.lorem.words(),
                descripcion: faker.lorem.sentence(),
                pasos_a_seguir: faker.lorem.lines(3),
                prioridades: faker.random.arrayElement(['Alta', 'Media', 'Baja']),
                fecha_inicio: faker.date.future().toISOString(),
                fecha_limite: faker.date.future().toISOString(),
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                usuario_id: faker.random.number()
            });
        expect(res.statusCode).toEqual(201);
    })
})
afterAll(async () => {
    server.close();
});