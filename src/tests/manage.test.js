const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let token = process.env.TOKEN

describe('Test crear relacion usuario y proyecto(gestiona)', () => {
    it('Post - Caso exitoso', async () => {
        const res = await app
            .post('/v1/manage')
            .set('Authorization', `Bearer ${token}`)
            .send({
                usuario_id: 2,
                proyecto_id: 1
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Manage obtener relacion usuario y proyecto(gestiona)', () => {
    it('GET - Caso exitoso', async () => {
        const res = await app
            .get(`/v1/manage`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    });
});

describe('Test eliminar relacion usuario y proyecto(gestiona)', () => {
    let projectIdDelete = 1;
    let userIdDelete = 2;

    it('Delete - Caso exitoso', async () => {
        const res = await app
            .delete(`/v1/manage/${userIdDelete}/${projectIdDelete}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar una relacion usuario/proyecto inexistente', async () => {
        const nonExistentProject = 999;
        const nonExistentUser = 999;

        const res = await app
            .delete(`/v1/project/${nonExistentUser}/${nonExistentProject}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(404);
    });
});


afterAll(async () => {
    server.close();
});