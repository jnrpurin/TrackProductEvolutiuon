//34 min - criar a camada services
const taskModel = require('../models/taskModels');

const getAll = async (request, response) => {
    const tasks = await taskModel.getAll();
    return response.status(200).json(tasks);
};

module.exports = {
    getAll
};