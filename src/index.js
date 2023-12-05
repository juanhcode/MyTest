const express =  require('express');
const app =  express();
const port = 4030
const cors = require('cors');
require('dotenv').config();

const users = require('./v1/routes/user.route');
const caso = require('./v1/routes/caso.route')


app.use(express.json());
app.use(cors({
  origin: 'https://proyecto-mytest.fly.dev'
}));

app.use('/v1/user',users);
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




