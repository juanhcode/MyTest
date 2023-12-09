const request = require('supertest');
const server = require('../index');
const app = request(server)
const token = process.env.TOKEN_TEST

describe('Test crear infrome', () => {
    it('Post - Caso exitoso', async () => {
        const res = await app
            .post('/v1/report')
            .set('Authorization', `Bearer ${token}`)
            .send({
                metricas_de_calidad: "20,50,92",
                cobertura_de_pruebas: 70,
                estadistica_de_errores: 10,
                caso_de_prueba_id:4
            });
        expect(res.statusCode).toEqual(201);
    });
    
});

describe('Manage obtener informes', () => {
    it('GET - Caso exitoso', async () => {
        const res = await app
            .get(`/v1/report`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    });
});

describe('Test actualizar informe', () => {
    let report;

    beforeAll(async () => {
        const res = await app
            .post('/v1/report')
            .set('Authorization', `Bearer ${token}`)
            .send({
                metricas_de_calidad: "25,52,59",
                cobertura_de_pruebas: 90,
                estadistica_de_errores: 36,
                caso_de_prueba_id:6
            });
        report = res.body.report;
    });

    it('PUT - Caso exitoso', async () => {
        const {id} = report;
        const res = await app
            .put(`/v1/report/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(report);
        expect(res.statusCode).toEqual(200);
    });
    it('PUT - Intentar actualizar un informe inexistente', async () => {
        const nonExistentReport = 999;

        const res = await app
            .put(`/v1/report/${nonExistentReport}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});

describe('Test eliminar informe', () => {
    let reportIdDelete;

    beforeAll(async () => {
        const res = await app
            .post('/v1/report')
            .set('Authorization', `Bearer ${token}`)
            .send({
                metricas_de_calidad: "10,12,53",
                cobertura_de_pruebas: 20,
                estadistica_de_errores: 50,
                caso_de_prueba_id:6
            });


            reportIdDelete = res.body.report.id;
    });

    it('Delete - Caso exitoso', async () => {
        const res = await app
            .delete(`/v1/report/${reportIdDelete}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
    });

    it('Delete - Intentar eliminar un proyecto inexistente', async () => {
        const nonExistentReport = 999;

        const res = await app
            .delete(`/v1/report/${nonExistentReport}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });
});


afterAll(async () => {
    server.close();
});