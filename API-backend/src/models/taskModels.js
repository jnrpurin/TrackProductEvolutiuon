const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT  * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const {title} = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    
    const insertSql = 'INSERT INTO tasks(title, status, created_at) VALUES(?,?,?)';
    const [createdTask] = await connection.execute(insertSql, [title, 'to do', dateUTC]);
    
    return {insertId: createdTask.insertId};
};

const deleteTask = async(id) => {
    const [remTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return remTask;
};

const updateTask = async(id, task) => {
    const {title, status} = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    
    const [updTask] = await connection.execute(query, [title, status, id]);
    return updTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};