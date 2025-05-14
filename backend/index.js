const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
const port = process.env.PORT;


const pokemon = require('./routes/carrito');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Prueba de servidor');
}
);


app.use('/api/carrito', pokemon);

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
