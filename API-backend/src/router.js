const express = require('express');
const taskController = require('./controllers/tasksController');

const router = express.Router();

//app.get('/', (request, response) => response.status(200).send('Hello_nodemon!!!'));
router.get('/tasks', taskController.getAll);

module.exports = router;