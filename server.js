const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();

// permite que envie dados no formato de JSON
app.use(express.json());

// permite acesso de outros domínios à API
app.use(cors());

// Conexão com o Mongo (usando o Docker)
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false // para não ter DeprecationWarning
});

/*
  antes era assim require('./src/models/Product');
  requireDir já pega todos os models do diretório
*/
requireDir('./src/models')

// use serve pra qualquer tipo de requisição (GET, POST, etc)
// pega todas as requisições para /api e manda pra routes.js
app.use('/api', require('./src/routes'))

app.listen(3001);