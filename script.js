const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
const sortBtn = document.getElementById('sortBtn');
const sortIcon = document.getElementById('sortIcon');

let isAscending = true;

function updateNumbers() {
    const items = taskList.querySelectorAll('.task-item');
    items.forEach((item, index) => {
        const numSpan = item.querySelector('.task-num');
        const editBtn = item.querySelector('.edit-save');
        if (index === items.length - 1) {
            numSpan.textContent = ""; 
            editBtn.style.visibility = "hidden";
        } else {
            numSpan.textContent = `${index + 1}.`;
            editBtn.style.visibility = "visible";
        }
    });
}

function createTask(text = "") {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    li.innerHTML = `
        <span class="task-num"></span>
        <input type="text" value="${text}" placeholder="">
        <div class="item-actions">
            <button class="action-btn edit-save">
                <img src="img/edit.svg" alt="Edit">
            </button>
            <button class="action-btn delete">
                <img src="img/delete.svg" alt="Delete">
            </button>
        </div>
    `;

    const input = li.querySelector('input');
    const editBtn = li.querySelector('.edit-save');
    const editImg = editBtn.querySelector('img');

    if (text !== "") input.disabled = true;

    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
        updateNumbers();
        if (taskList.children.length === 0) createTask(); 
    });

    editBtn.addEventListener('click', () => {
        if (input.disabled) {
            input.disabled = false;
            editImg.src = "img/confirm.svg";
            input.focus();
        } else {
            input.disabled = true;
            editImg.src = "img/edit.svg";
        }
    });

    taskList.appendChild(li);
    updateNumbers();
}

createTask();

addBtn.addEventListener('click', () => createTask());

sortBtn.addEventListener('click', () => {
    const tasks = Array.from(taskList.querySelectorAll('.task-item'));
    const lastTask = tasks.pop();

    tasks.sort((a, b) => {
        const valA = a.querySelector('input').value.toLowerCase();
        const valB = b.querySelector('input').value.toLowerCase();
        return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    isAscending = !isAscending;
    sortIcon.src = isAscending ? "img/sort-asc.svg" : "img/sort-down.svg";

    taskList.innerHTML = "";
    tasks.forEach(t => taskList.appendChild(t));
    taskList.appendChild(lastTask);
    updateNumbers();
});