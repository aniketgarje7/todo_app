const express = require('express');
const { Auth } = require('../middlewares/auth.middleware');
const { deleteTasks } = require('../controllers/task.controller');


const app = express();

app.delete('/delete',Auth,deleteTasks);

module.exports = app;