const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let jwt = process.env.TOKEN

describe('Test crear seguimientos de errores', () => {
    it('Post - Seguimiento exitoso', async () => {
        const res = await app
            .post('/v1/seguimiento')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                error_priorizado: faker.helpers.arrayElement(['Alto', 'Medio', 'Bajo']).toString(),
                nombre_error: faker.word.words(),
                caso_de_prueba_id:6
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Test eliminar seguimiento', () => {
    let casoIdToDelete;
    let seguimientoIdDelete;

    beforeAll(async () => {
        const res = await app
            .post('/v1/caso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElement(['Alto', 'Medio', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id: 2
            });
        casoIdToDelete = res.body.caso;
    });

    it('Post - Seguimiento exitoso', async () => {
        const res = await app
            .post('/v1/seguimiento')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                error_priorizado: faker.helpers.arrayElement(['Alto', 'Medio', 'Bajo']).toString(),
                nombre_error: faker.word.words(),
                caso_de_prueba_id:casoIdToDelete.id
            });
            seguimientoIdDelete = res.body.seguimiento.id;
        expect(res.statusCode).toEqual(201);
    });

    it('Delete - seguimiento exitoso', async () => {
        const res = await app
            .delete(`/v1/seguimiento/${seguimientoIdDelete}`)
            .set('Authorization', `Bearer ${jwt}`);
        
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar un seguimiento inexistente', async () => {
        const casoIdInexistente = 999;

        const res = await app
            .delete(`/v1/seguimiento/${casoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        
        expect(res.statusCode).toEqual(404);
    });
});

describe('Test actualizar seguimientos', () => {
    let caso;
    let seguimiento;

    beforeAll(async () => {
        const res = await app
            .post('/v1/caso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
                descripcion: faker.word.words(),
                pasos_a_seguir: faker.word.words(4),
                prioridades: faker.helpers.arrayElement(['Alto', 'Medio', 'Bajo']).toString(),
                fecha_inicio: faker.date.recent().toISOString().split('T')[0],
                fecha_limite: faker.date.future().toISOString().split('T')[0],
                datos_de_prueba: faker.lorem.sentence(),
                expectativas: faker.lorem.sentence(),
                proyecto_id:2
            });
        caso = res.body.caso;
    });

    it('Post - Seguimiento exitoso', async () => {
        const {id} = caso;
        const res = await app
            .post('/v1/seguimiento')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                error_priorizado: faker.helpers.arrayElement(['Alto', 'Medio', 'Bajo']).toString(),
                nombre_error: faker.word.words(),
                caso_de_prueba_id:id
            });
            seguimiento = res.body.seguimiento;
        expect(res.statusCode).toEqual(201);
    });

    it('PUT - Seguimiento exitoso', async () => {

        seguimiento.error_priorizado = 'Alta';
        const res = await app
            .put(`/v1/seguimiento/${seguimiento.id}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(seguimiento)
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar un caso inexistente', async () => {
        const casoIdInexistente = 999;
        const res = await app
            .put(`/v1/seguimiento/${casoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);    
        expect(res.statusCode).toEqual(404);
    });
});