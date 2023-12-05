const request = require('supertest');
const server = require('../index');
const app = request(server);
require('dotenv').config();

describe('Pruebas de inicio de sesión', () => {
    it('Post', async () => {
        const response = await app
            .post('/v1/login')
            .send({
                correo: "usuario1@gmail.com",
                contrasenia: "123456"
            })

        expect(response.status).toBe(200);
    });
    it('Post', async () => {
        const response = await app
            .post('/v1/login')
            .send({
                correo: "emailQueNoExiste@gmail.com",
                contrasenia: "1234454"
            });

        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('No existe usuario con el correo: emailQueNoExiste@gmail.com');
    });
    it('Post', async () => {
        const response = await app
            .post('/v1/login')
            .send({
                correo: "usuario1@gmail.com",
                contrasenia: "12344"
            });
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Contraseña incorrecta');
    });
    it('Post', async () => {
        const response = await app
            .post('/v1/login')
            .send({});
        const parsedResponse = JSON.parse(response.text);
        expect(response.status).toBe(400);
        expect(parsedResponse.errors[0].msg).toBe('El correo es obligatorio');
        expect(parsedResponse.errors[2].msg).toBe('La contraseña es obligatoria');
    });
    it('Debería fallar el inicio de sesión si se proporciona un SQL Injection en el nombre de usuario', async () => {
        const response = await app
            .post('/v1/login')
            .send({
                correo: "usuario1' or '1' = '1",
                contrasenia: "1234"
            });

            const parsedResponse = JSON.parse(response.text);
        expect(response.status).toBe(400);
        expect(parsedResponse.errors[0].msg).toBe('El correo no es valido');
    });

})