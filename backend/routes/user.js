const express = require('express');
const { loginUser, siginUser, getUser } = require('../controllers/user.controller');
const { Auth } = require('../middlewares/auth.middleware');

const app = express();

app.post('/login',loginUser);
app.post('/signin',siginUser);
app.get('/get',Auth,getUser);
module.exports = app;