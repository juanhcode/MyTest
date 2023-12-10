const request = require('supertest');
const server = require('../index');
const app = request(server)
require('dotenv').config();
let token = process.env.TOKEN


describe('Subir/Actualizar imagen', () => {

    it('PUT - Caso exitoso', async () => {
        const res = await app
        .put(`/v1/uploadFile/user/2`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data')
        .attach('file', 'src/descarga.jpg')
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar una coleccion inexistente', async () => {
        const res = await app
        .put(`/v1/uploadFile/inexistent/20`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data')
        .attach('file', 'src/descarga.jpg')
        
        expect(res.statusCode).toEqual(400);
    });
    it('PUT - Intentar actualizar una usuario/testResult inexistente', async () => {
        const res = await app
        .put(`/v1/uploadFile/inexistent/999`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data')
        .attach('file', 'src/descarga.jpg')
        
        expect(res.statusCode).toEqual(400);
    });
    it('PUT - Intentar actualizar una usuario/testResult sin mandar la imagen', async () => {
        const res = await app
        .put(`/v1/uploadFile/inexistent/999`)
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data')
        .attach('file')
        
        expect(res.statusCode).toEqual(400);
    });
});