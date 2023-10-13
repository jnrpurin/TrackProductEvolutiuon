const express = require('express');
const taskController = require('./controllers/tasksController');
const taskMiddleware = require('./middlewares/tasksMiddleware');
const router = express.Router();

router.get('/tasks', taskController.getAll);

//taskController.verifyJWT, 
router.post('/tasks', 
    taskMiddleware.validateTitle,
    taskController.createTask);

router.delete('/tasks/:id', taskController.verifyJWT, 
    taskController.deleteTask);

router.put('/tasks/:id', taskController.verifyJWT, 
    taskMiddleware.validateTitle,
    taskMiddleware.validateStatus,
    taskController.updateTask);

//webToken:
router.post('/login', taskController.postLogin);
router.post('/logout', taskController.postLogout);

module.exports = router;