const express = require('express');
const { create_list, updateList, fetchList } = require('../controllers/list.controller');
const { Auth } = require('../middlewares/auth.middleware');

const app = express();

app.post('/create',Auth,create_list);
app.put('/update',Auth,updateList);
app.get('/fetch',Auth,fetchList);

module.exports = app;