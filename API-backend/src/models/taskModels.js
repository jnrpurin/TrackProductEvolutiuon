const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT  * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const {title} = task;
    const insertSql = 'INSERT INTO tasks(title, status, created_at) VALUES(?,?,?)';
    const createdTask = await connection.execute(insertSql, [title, 'Not Started', Date.now().toLocaleString()]);
    return createdTask;
};

module.exports = {
    getAll
};