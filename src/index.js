const express =  require('express');
const app =  express();
const port = 3030
const cors = require('cors');
const helmet = require("helmet");
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
require('dotenv').config();

const users = require('./v1/routes/user.routes');
const caso = require('./v1/routes/caso.route');
const auth = require('./v1/routes/auth.routes');
const projects = require('./v1/routes/project.routes');
const manageRelations = require('./v1/routes/manage.routes');
const testResults = require('./v1/routes/testResult.routes');
const uploadImage = require('./v1/routes/image.routes');
const report = require('./v1/routes/report.routes');
const pdf = require('./v1/routes/pdf.routes');
const seguimiento = require('./v1/routes/seguimiento.routes');
const permiso = require('./v1/routes/permiso.route')
const permisoUsuario = require('./v1/routes/permisoUsuario.route')
const pruebaVerificarPermiso = require('./v1/routes/verifyPermiso.routes');
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: '/tmp/',
  createParentPath: true
}));

app.use('/v1/login', auth)
app.use('/v1/user',users)
app.use('/v1/project',projects)
app.use('/v1/manage',manageRelations)
app.use('/v1/testResult',testResults)
app.use('/v1/uploadFile',uploadImage)
app.use('/v1/caso', caso);
app.use('/v1/report', report);
app.use('/v1/reportPDF', pdf);
app.use('/v1/seguimiento', seguimiento);
app.use('/v1/permiso',permiso);
app.use('/v1/permisoUsuario',permisoUsuario);
app.use('/v1/prueba',pruebaVerificarPermiso);

app.get('/', (req, res) => {
  return res.status(200).json({
    nome: 'Learn SonarQube code coverage',
    status: true
  });
});

let server = app.listen(0, () => {
  const port1 = server.address().port;
  console.log(`Application server running on ${port1}`);
});

module.exports = server;




