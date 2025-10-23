const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Näytetään tallennetut tehtävät
renderTodos();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();

  // Validointi
  if (text.length < 3) {
    errorMessage.textContent = 'Tehtävän pitää olla vähintään 3 merkkiä pitkä.';
    input.classList.add('error');
    return;
  }

  input.classList.remove('error');
  errorMessage.textContent = '';

  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  saveTodos();
  renderTodos();

  input.value = '';
});

function renderTodos() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="action-buttons">
        <button class="done-btn" title="Merkitse tehdyksi">✔️</button>
        <button class="delete-btn" title="Poista">🗑️</button>
      </div>
    `;

    // Merkitse tehdyksi
    li.querySelector('.done-btn').addEventListener('click', () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    // Poista tehtävä
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    list.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}