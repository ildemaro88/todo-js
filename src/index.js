import { crearTodoHtml } from './js/componentes';
import './styles.css';
import {Todo, TodoList} from "./classes/index.js";

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );
todoList.todos[0].imprimirClase();
