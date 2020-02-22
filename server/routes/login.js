const express = require('express');
const loginRouter = express.Router();
const path = require('path');

// import controllers
const githubController = require('../controllers/githubController');
const jwtsController = require('../controllers/jwtsController');

// import secrets
const githubSecret = require('../_secret/githubSecret');

loginRouter.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../login.html'))
});

// first step of github oauth, direct user to github login page
loginRouter.get('/oauth', (req, res) => {
  const url = 'https://github.com/login/oauth/authorize?' +
    'scope=user&' +
    'redirect_uri=http://localhost:3000/login/callback&' +
    `client_id=${githubSecret.clientId}`;

  return res.redirect(url);
});

// redirect from github including the temporary code from user
loginRouter.get('/callback',
  githubController.token,
  githubController.userData,
  githubController.createUser,
  jwtsController.loginUser,
  (req, res) => {
    res.redirect('/');
  }
)

module.exports = loginRouter; 