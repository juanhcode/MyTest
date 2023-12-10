const { faker } = require('@faker-js/faker');
const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let jwt = process.env.TOKEN
describe('Test crear permisos de usuario', () => {
    let permisoId;
    beforeAll(async () => {
        const res = await app
            .post('/v1/permiso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
            });
            permisoId = res.body.caso.id;
    });

    it('Post - Permiso Usuario exitoso', async () => {
        const res = await app
            .post('/v1/permisoUsuario')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                usuario_id:2,
                permiso_id:permisoId
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Test eliminar permisos de usuario', () => {
    let permisoId;
    

    beforeAll(async () => {
        const res = await app
            .post('/v1/permiso')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                nombre: faker.word.words(),
            });
            permisoId = res.body.caso.id;
    });
    let idUser;
    it('Post - Permiso Usuario exitoso', async () => {
        const res = await app
            .post('/v1/permisoUsuario')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                usuario_id:2,
                permiso_id:permisoId
            });
            idUser = res.body.caso.usuario_id;
        expect(res.statusCode).toEqual(201);
    });
    it('Delete - Permiso Usuario Eliminado', async () => {
        const res = await app
            .delete(`/v1/permisoUsuario/${idUser}`)
            .set('Authorization', `Bearer ${jwt}`);
            console.log(res.body);
        expect(res.statusCode).toEqual(200);
    });    
});