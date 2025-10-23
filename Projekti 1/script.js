// Haetaan tarvittavat HTML-elementit
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

// Ladataan tehtävät localStoragesta tai aloitetaan tyhjällä listalla
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Näytetään tallennetut tehtävät sivulle
renderTodos();

// Kuunnellaan lomakkeen lähettämistä ja lisätään uusi tehtävä
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();

  // Tarkistetaan että syöte on vähintään 3 merkkiä
  if (text.length < 3) {
    errorMessage.textContent = 'Tehtävän pitää olla vähintään 3 merkkiä pitkä.';
    input.classList.add('error');
    return;
  }

  // Lisätään uusi tehtävä listaan
  input.classList.remove('error');
  errorMessage.textContent = '';
  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
  input.value = '';
});

// Piirretään tehtävät näkyviin listalle
function renderTodos() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';

    // Tehtävän sisältö ja toiminnot
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="action-buttons">
        <button class="done-btn" title="Merkitse tehdyksi">✔️</button>
        <button class="delete-btn" title="Poista">🗑️</button>
      </div>
    `;

    // Merkitään tehtävä tehdyksi tai perutaan merkintä
    li.querySelector('.done-btn').addEventListener('click', () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    // Poistetaan tehtävä listasta
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    list.appendChild(li);
  });
}

// Tallennetaan tehtävät localStorageen
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}