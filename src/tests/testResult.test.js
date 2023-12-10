const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let token = process.env.TOKEN

describe('Test crear resultado de prueba', () => {
    it('Post - Caso exitoso', async () => {
        const res = await app
            .post('/v1/testResult')
            .set('Authorization', `Bearer ${token}`)
            .send({
                casos_no_ejecutados: faker.word.words(),
                fallos: faker.word.words(),
                exitos: faker.word.words(),
                caso_de_prueba_id: 1
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Project resultado de prueba', () => {
    it('GET - Caso exitoso', async () => {
        const res = await app
            .get(`/v1/testResult`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    });
});

describe('Test actualizar resultado de prueba', () => {
    let testResult;

    beforeAll(async () => {
        const res = await app
            .post('/v1/testResult')
            .set('Authorization', `Bearer ${token}`)
            .send({
                casos_no_ejecutados: faker.word.words(),
            });
            testResult = res.body.testResult;
    });

    it('PUT - Caso exitoso', async () => {
        const {id} = testResult;
        const res = await app
            .put(`/v1/testResult/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(testResult);
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar un resultado de prueba inexistente', async () => {
        const nonExistentTestResult = 999;

        const res = await app
            .put(`/v1/testResult/${nonExistentTestResult}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});

describe('Test eliminar resultado de prueba', () => {
    let testResultIdDelete;

    beforeAll(async () => {
        const res = await app
            .post('/v1/testResult')
            .set('Authorization', `Bearer ${token}`)
            .send({
                casos_no_ejecutados: faker.word.words(),
                fallos: faker.word.words(),
                exitos: faker.word.words(),
                caso_de_prueba_id: 6
            });


            testResultIdDelete = res.body.testResult.id;
    });

    it('Delete - Caso exitoso', async () => {
        const res = await app
            .delete(`/v1/testResult/${testResultIdDelete}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar un resultado de prueba inexistente', async () => {
        const nonExistentTestResult = 999;

        const res = await app
            .delete(`/v1/testResult/${nonExistentTestResult}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});


afterAll(async () => {
    server.close();
});