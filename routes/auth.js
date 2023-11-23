const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');

// Endpoint para Cadastro de Usuário (Sign Up)
router.post('/signup', async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      telefones,
    });

    await novoUsuario.save();

    const token = jwt.sign({ id: novoUsuario._id }, 'segredo', { expiresIn: '30m' });

    res.json({
      id: novoUsuario._id,
      data_criacao: novoUsuario.data_criacao,
      data_atualizacao: novoUsuario.data_atualizacao,
      ultimo_login: novoUsuario.ultimo_login,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Endpoint para Autenticação (Sign In)
router.post('/signin', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    usuario.ultimo_login = new Date();
    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, 'segredo', { expiresIn: '30m' });

    res.json({
      id: usuario._id,
      data_criacao: usuario.data_criacao,
      data_atualizacao: usuario.data_atualizacao,
      ultimo_login: usuario.ultimo_login,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Endpoint para Buscar Informações do Usuário
router.get('/usuario', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'segredo', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
      }

      try {
        const usuario = await Usuario.findById(decoded.id);

        if (!usuario) {
          return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        const agora = new Date();
        const tempoDecorrido = agora - usuario.ultimo_login;

        if (tempoDecorrido > 30 * 60 * 1000) {
          return res.status(401).json({ mensagem: 'Sessão inválida' });
        }

        res.json({
          id: usuario._id,
          data_criacao: usuario.data_criacao,
          data_atualizacao: usuario.data_atualizacao,
          ultimo_login: usuario.ultimo_login,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

module.exports = router;
