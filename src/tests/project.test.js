const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let token = process.env.TOKEN

describe('Test crear proyecto', () => {
    it('Post - Caso exitoso', async () => {
        const res = await app
            .post('/v1/project')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: faker.word.words()
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Project obtener proyectos', () => {
    it('GET - Caso exitoso', async () => {
        const res = await app
            .get(`/v1/project`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    });
});

describe('Test actualizar proyecto', () => {
    let project;

    beforeAll(async () => {
        const res = await app
            .post('/v1/project')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: faker.word.words(),
            });
        project = res.body.project;
    });

    it('PUT - Caso exitoso', async () => {
        const {id} = project;
        const res = await app
            .put(`/v1/project/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(project);
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar un proyecto inexistente', async () => {
        const nonExistentProject = 999;

        const res = await app
            .put(`/v1/project/${nonExistentProject}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});

describe('Test eliminar proyecto', () => {
    let projectIdDelete;

    beforeAll(async () => {
        const res = await app
            .post('/v1/project')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: faker.word.words(),
            });


            projectIdDelete = res.body.project.id;
    });

    it('Delete - Caso exitoso', async () => {
        const res = await app
            .delete(`/v1/project/${projectIdDelete}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar un proyecto inexistente', async () => {
        const nonExistentProject = 999;

        const res = await app
            .delete(`/v1/project/${nonExistentProject}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});


afterAll(async () => {
    server.close();
});