const express =  require('express');
const app =  express();
const port = 3000
const cors = require('cors');
require('dotenv').config();

const users = require('./v1/routes/user.route');

app.use(express.json());
app.use(cors());

app.use('/v1/user',users)

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