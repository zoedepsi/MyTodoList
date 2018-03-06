var store_key = "todos_vue";
const todoStorage = {
  fetch: () => JSON.parse(localStorage.getItem(store_key) || '[]'),
  save: (todos) => localStorage.setItem(store_key, JSON.stringify(todos))
}
export default todoStorage
