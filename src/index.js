const express =  require('express');
const app =  express();
const port = 4030
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const users = require('./v1/routes/user.routes');
const caso = require('./v1/routes/caso.route')
const auth = require('./v1/routes/auth.routes')
const projects = require('./v1/routes/project.routes')
const manageRelations = require('./v1/routes/manage.routes')
const testResults = require('./v1/routes/testResult.routes')
const uploadImage = require('./v1/routes/image.routes')

app.use(express.json());
app.use(cors());
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

app.get('/', (req, res) => {
    return res.status(200).json({ 
      nome:  'Learn SonarQube code coverage',
      status: true 
    });
});

let server = app.listen(port, () => {
    console.log(`Application server running on ${port}`);
});

module.exports  = server;




