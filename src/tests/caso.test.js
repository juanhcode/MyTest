const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let jwt = process.env.TOKEN
console.log(jwt);

describe('Test crear casos de prueba', () => {
    it('Post - Caso exitoso', async () => {
        const res = await app
            .post('/v1/caso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElements(['Alto', 'Medio', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id:1
            });
        expect(res.statusCode).toEqual(201);
    });
    
});


describe('Test eliminar casos de prueba', () => {
    let casoIdToDelete;
    beforeAll(async () => {
        const res = await app
            .post('/v1/caso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElements(['Alto', 'Medio', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id:1
            });
        casoIdToDelete = res.body.caso.id;
    });

    it('Delete - Caso exitoso', async () => {
        const res = await app
            .delete(`/v1/caso/${casoIdToDelete}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar un caso inexistente', async () => {
        const casoIdInexistente = 999;

        const res = await app
            .delete(`/v1/caso/${casoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        
        expect(res.statusCode).toEqual(404);
    });
});


describe('Test actualizar casos de prueba', () => {
    let caso;

    beforeAll(async () => {
        const res = await app
            .post('/v1/caso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElements(['Alto', 'Medio', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id:1
            });
        caso = res.body.caso;
    });

    it('PUT - Caso exitoso', async () => {
        const {id} = caso;
        caso.prioridades = 'Alta';
        const res = await app
            .put(`/v1/caso/${id}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(caso)
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar un caso inexistente', async () => {
        const casoIdInexistente = 999;

        const res = await app
            .put(`/v1/caso/${casoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        
        expect(res.statusCode).toEqual(404);
    });
});


describe('Test obtener casos de prueba', () => {

    it('GET - Caso exitoso', async () => {
        const id = 1;
        const res = await app
            .get(`/v1/caso/${id}`)
            .set('Authorization', `Bearer ${jwt}`)
        expect(res.statusCode).toEqual(200);
    });
    it('GET - Intentar obtener casos de un proyecto que no existe', async () => {
        const proyectoIdInexistente = 999;
        const res = await app
            .get(`/v1/caso/${proyectoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).toBe(`No hay casos de prueba para este proyecto`);
    });
    it('GET - Entrada incorrecta', async () => {
        const proyectoIdInexistente = 'd';
        const res = await app
            .get(`/v1/caso/${proyectoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toBe(`Error al obtener todos los casos de prueba`);
    });
});


afterAll(async () => {
    server.close();
});