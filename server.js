const express = require('express');
const bodyParser = require('body-parser');
const cors      = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.post('/cadastrar', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const servico = req.body.servico;

  if (!nome || !email || !telefone || !servico) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios'
    });
  }

  db.run(
    'INSERT INTO tutores (nome, email, telefone, servico) VALUES (?, ?, ?, ?)',
    [nome, email, telefone, servico],
    (err) => {
      if (err) {
        return res.status(500).json({
          mensagem: 'Erro ao cadastrar tutor'
        });
      }

      res.status(201).json({
        mensagem: 'Tutor cadastrado com sucesso'
      });
    }
  );
});

app.get('/listar', (req, res) => {
  db.all(
    'SELECT * FROM tutores',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          mensagem: 'Erro ao listar tutores'
        });
      }

      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

