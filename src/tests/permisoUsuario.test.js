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

describe('Test verificar permisos de usuario admin', () => {
    it('Get - Permiso fallido', async () => {
        const res = await app
            .get('/v1/prueba')
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(403);
    });  
});


describe('Test obtener permisos de usuario', () => {

    it('GET - Permisos de usuario exitoso', async () => {
        const id = 1;
        const res = await app
            .get(`/v1/permisoUsuario/${id}`)
            .set('Authorization', `Bearer ${jwt}`)
        expect(res.statusCode).toEqual(200);
    });
    it('GET - Intentar obtener seguimientos de id que no existe', async () => {
        const proyectoIdInexistente = 999;
        const res = await app
            .get(`/v1/permisoUsuario/${proyectoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).toBe(`No hay permisos para el usuario`);
    });
    it('GET - Entrada incorrecta', async () => {
        const proyectoIdInexistente = 'd';
        const res = await app
            .get(`/v1/permisoUsuario/${proyectoIdInexistente}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toBe(`Error al obtener todos los permisos del usuario`);
    });
});