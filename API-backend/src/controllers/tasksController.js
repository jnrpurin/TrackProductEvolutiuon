//34 min - criar a camada services
const taskModel = require('../models/taskModels');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAll = async (request, response) => {
    const tasks = await taskModel.getAll();
    return response.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const cTask = await taskModel.createTask(req.body);
    return res.status(201).json(cTask);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await taskModel.deleteTask(id);
    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    await taskModel.updateTask(id, req.body);
    return res.status(204).json();
};

const postLogin = (req, res) => {
    if (req.body.user === process.env.MYSQL_USER &&
        req.body.password === process.env.MYSQL_PASS) {
        const token = jwt.sign({userId: 1}, process.env.SECRET, {expiresIn: 300});
        return res.status(200).json({auth: true, token });
    }
    res.status(401).end();
};

const blacklist = []; //should be a table in the DB (MongoDB has an option to remove records after specific time)
const postLogout = (req, res) => {
    blacklist.push(req.headers['x-access-token']);
    res.end();
};

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    const index = blacklist.findIndex(i => i===token);
    if(index !== -1) return res.status(401).end();

    jwt.verify(token, process.env.SECRET, (err, decoded) =>{
        if(err) return res.status(401).end();
        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
    postLogin,
    postLogout,
    verifyJWT
};