const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conexão com MONGODB
mongoose.connect('mongodb+srv://escribo:vzpjVPFphK4oGfWC@cluster0.f4baenk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
