const addForm = document.getElementById('addForm');
const addInput = document.getElementById('addInput');
const parentUL = document.getElementById('parentUL');

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = addInput.value;
  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    let addEl = document.createElement('li');
    if (todo && todo.completed) {
      addEl.classList.add('completed');
    }
    addEl.innerHTML = `<li></li>`;
    addEl.innerText = todoText.toLowerCase();
    addEl.classList =
      'list-group-item d-flex justify-content-between align-items-center';
    parentUL.appendChild(addEl);
    addInput.value = '';

    updateLS();
  }
}

function updateLS() {
  let todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const parentULSearch = document.getElementById('parentULSearch');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchTodo();
});
function searchTodo() {
  const todos = JSON.parse(localStorage.getItem('todos'));

  try {
    if (todos) {
      let todoText = searchInput.value;
      let lowerCase = todoText.toLowerCase();
      const searchItem = todos.filter((todo) => todo.text.includes(lowerCase));
      let searchEl = document.createElement('li');
      searchEl.innerHTML = `<li></li>`;
      searchEl.innerText = `${searchItem[0].text.charAt(0).toUpperCase() + searchItem[0].text.slice(1)}`;
      searchEl.classList =
        'list-group-item d-flex justify-content-between align-items-center';
      searchEl.addEventListener('click', () => {
        searchEl.classList.toggle('completed');
        updateLS();
      });
      searchEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        searchEl.classList.toggle('completed');
        searchEl.remove();
        updateLS();
      });
      parentULSearch.appendChild(searchEl);
      searchInput.value = '';
    }
  } catch (err) {
    alert('TODO item not present.');
  }
}
