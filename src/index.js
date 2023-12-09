const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const users = require('./v1/routes/user.routes');
const caso = require('./v1/routes/caso.route');
const auth = require('./v1/routes/auth.routes');
const projects = require('./v1/routes/project.routes');
const manageRelations = require('./v1/routes/manage.routes');
const seguimiento = require('./v1/routes/seguimiento.routes');
const permiso = require('./v1/routes/permiso.route');
const permisoUsuario = require('./v1/routes/permisoUsuario.route');
const morgan = require('morgan');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.use('/v1/user', users);
app.use('/v1/caso', caso);
app.use('/v1/login', auth);
app.use('/v1/project', projects);
app.use('/v1/manage', manageRelations);
app.use('/v1/seguimiento', seguimiento);
app.use('/v1/permiso',permiso);
app.use('/v1/permisoUsuario',permisoUsuario);

app.get('/', (req, res) => {
  return res.status(200).json({
    nome: 'Learn SonarQube code coverage',
    status: true
  });
});

let server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Application server running on ${port}`);
});

module.exports = server;




