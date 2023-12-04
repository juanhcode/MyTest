const express =  require('express');
const app =  express();
const port = 3030
const cors = require('cors');
require('dotenv').config();

const auth = require('./v1/routes/auth.routes')
const users = require('./v1/routes/user.routes');
const projects = require('./v1/routes/project.routes')
const manageRelations = require('./v1/routes/manage.routes')

app.use(express.json());
app.use(cors({
  origin: 'https://proyecto-mytest.fly.dev'
}));

app.use('/v1/login', auth)
app.use('/v1/user',users)
app.use('/v1/project',projects)
app.use('/v1/manage',manageRelations)

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