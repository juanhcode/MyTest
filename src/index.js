const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const caso = require('./v1/caso.route');


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//Routes

app.use('/v1/caso', caso);

app.get('/', (req, res) => { return res.status(200).json({ nome: 'Learn SonarQube code coverage', status: true }); });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server running in port " + process.env.PORT || 3000);
})

module.exports = server;