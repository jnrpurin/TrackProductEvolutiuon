const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-add-task');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3133/tasks'); //34
    const tasks = await response.json();
    return tasks;
}

//const getToken = async () => {   
//    const body = { user: '', password: '' };
//    const taskToken = await fetch('http://localhost:3133/login', {
//        method: 'post',
//        headers: { 'Content-Type': 'application;json' },
//        body: JSON.stringify(body)
//    });
//
//    return taskToken.token;
//}

const addTask = async (event) => {
    event.preventDefault();
    
    const task = { title: inputTask.value };
    //const token = getToken();

    await fetch('http://localhost:3133/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });

    loadTasks();
    inputTask.value = '';
}

const formatDate = (dateUTC) => {
    const optDate = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('en-us', optDate);
    return date;
}

const createSelect = (value) => {
    const options = `
        <option value="to do">to do</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
    `;
    const select = createHtmlElement('select', '', options);
    select.value = value;
    return select;
}

const createHtmlElement = (tag, innerText = '', innerHtml = '') => {
    const element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    }

    if(innerHtml) {
        element.innerHtml = innerHtml;
    }
    
    return element;
}

const createTaskRow = (task) => {
    const { id, title, created_at, status } = task;

    const tr = createHtmlElement('tr');
    const tdTitle = createHtmlElement('td', title);
    const tdDate = createHtmlElement('td', formatDate(created_at));
    const tdStatus = createHtmlElement('td');
    const tdActions = createHtmlElement('td');
    
    const select = createSelect(status);

    const editButton = createHtmlElement('button', '', '<span class="material-symbols-outlined">edit</span>');    
    const deleteButton = createHtmlElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
    
    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdDate);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    //tbody.appendChild(tr);
    return tr;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createTaskRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();