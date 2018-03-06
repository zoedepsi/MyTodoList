<template>
  <div id="app">
    <section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" v-model.trim="newTodo" @keyup.enter="addNewTodo" autofocus autocomplete="off" placeholder="What needs to be done?">
			</header>
			<section class="main" v-show="todos.length" >
				<input class="toggle-all" type="checkbox" v-model="allDone" >
				<ul class="todo-list">
					<li class="todo" v-for="(todo,index) in filteredTodos" :class="{completed:todo.completed,editing:todo==tempTodo}" :key="index" >
						<div class="view">
							<input class="toggle" type="checkbox" v-model="todo.completed" >
							<label @dblclick="editTodo(todo)">{{todo.title}}</label>
							<button class="destroy" @click="deleteTodo(todo)"></button>
						</div>
						<input class="edit" type="text" v-model.trim="todo.title" v-todo-focus="todo==tempTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
					</li>
				</ul>
			</section>
			<footer class="footer">
				<span class="todo-count">
					<strong v-text="remaining"></strong> {{pluralize('item',remaining)}}  left
				</span>
				<ul class="filters">
					<li><a @click="changeView('all')" :class="{selected:visibility=='all'}" >All</a></li>
					<li><a @click="changeView('active')" :class="{selected:visibility=='active'}" >Active</a></li>
					<li><a @click="changeView('completed')" :class="{selected:visibility=='completed'}">Completed</a></li>
				</ul>
				<button class="clear-completed" v-show="todos.length > remaining" @click="removeCompleted">
					Clear completed
				</button>
			</footer>
		</section>
  </div>
</template>

<script>
import todoStorage from './store' 
export default {
  name: "App",
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: "",
      tempTodo: null,
      visibility: "all"
    };
  },
  watch:{
    todos:{
      deep:true,
      handler:todoStorage.save
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    filteredTodos() {
      switch (this.visibility) {
        case "all":
          return this.todos;
        case "active":
          return this.todos.filter(todo => !todo.completed);
        case "completed":
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    }
  },
  methods: {
    pluralize(word, count) {
      return word + (count === 1 ? "" : "s");
    },
    addNewTodo() {
      this.todos.push({ title: this.newTodo, completed: false });
      this.newTodo = "";
    },
    deleteTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    removeCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.tempTodo = todo;
    },
    doneEdit(todo) {
      this.tempTodo = null;
      if (!todo.title) {
        this.deleteTodo(todo);
      }
    },
    cancelEdit(todo) {
      this.tempTodo = null;
      todo.title = this.beforeEditCache;
    },
    changeView(status) {
      this.visibility = status;
    }
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>
<style src="./assets/base.css" ></style>
<style src="./assets/index.css" ></style>
<style>
.filters li a {
  cursor: pointer;
}
</style> 
