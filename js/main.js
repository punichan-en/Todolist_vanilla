// TODOの状態管理
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM要素の取得
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// TODOリストの保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// TODOリストの表示
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', () => deleteTodo(index));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// 新しいTODOの追加
function addTodo(text) {
    todos.push({
        text: text,
        completed: false
    });
    saveTodos();
    renderTodos();
}

// TODOの削除
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// TODOの完了状態の切り替え
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// フォームの送信イベント
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = '';
    }
});

// 初期表示
renderTodos();
