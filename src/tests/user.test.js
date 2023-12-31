const request = require('supertest');
const { faker } = require('@faker-js/faker');
const server = require('../index');
const app = request(server);
require('dotenv').config();

describe('Pruebas de registro de usuario', () => {

    it('Post', async () => {
      const response = await app
      .post('/v1/user')
      .send({
        nombre: faker.person.firstName(),
        correo: faker.internet.email(),
        contrasenia: faker.internet.password(),
      })
      expect(response.statusCode).toEqual(201);
      expect(response.body.msg).toBe(`Usuario: ${response.body.msg.split(' ')[1]} ha sido creado correctamente`)
    })
    it('Post', async () => {
      const response = await app
      .post('/v1/user')
      .send({
        nombre: "usuario10",
        correo: "usuario10@gmail.com",
        contrasenia: "123456"
      })
      console.log(response.body);
      const parsedResponse = JSON.parse(response.text);
      expect(response.status).toBe(400);
      expect(parsedResponse.errors[0].msg).toBe('El correo usuario10@gmail.com ya esta registrado')
    })
  
    it('Post', async () => {
      const response = await app
      .post('/v1/user')
      .send({
        nombre: "usuario3",
      },
      {},
      {
        nombre: "usuario3",
        correo: "usuario3@gmail.com"
      })
      for (const campo in response.body) {
        if (campo.startsWith('Falta el campo obligatorio: ')) {
          const campoFaltante = campo.replace('Falta el campo obligatorio: ', '');
          expect(response.status).toBe(400);
          expect(campo).toBe(`Falta el campo obligatorio: ${campoFaltante}`);
        }
      }
    })
})
afterAll(async () => {
  server.close();
});

