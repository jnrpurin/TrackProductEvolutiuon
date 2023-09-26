const express = require('express');
const taskController = require('./controllers/tasksController');

const router = express.Router();

//app.get('/', (request, response) => response.status(200).send('Hello_nodemon!!!'));

//Open:
router.get('/tasks', taskController.getAll);

//it will need the token to create the task
router.post('/tasks', taskController.verifyJWT, taskController.createTask);

//webToken:
router.post('/login', taskController.postLogin);

router.post('/logout', taskController.postLogout);

module.exports = router;