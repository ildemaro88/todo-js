// Referencias en el HTML
import {Todo} from "../classes";
import {todoList} from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const cantidadPendiente = document.querySelector('.todo-count');

export  const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li> 
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    actualizarPendientes();
    return div.firstElementChild;
}

// Evento
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        console.log(todoList);
        actualizarPendientes();
    }
});

divTodoList.addEventListener('click', (evento) => {
    const nombreElemento = evento.target.localName;
    const todoElemento = evento.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    actualizarPendientes();
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    let total = 0;
    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);

        }
    }
    actualizarPendientes();
})

ulFilters.addEventListener('click', (event) => {
   const filtro =event.target.text;
   if(!filtro){ return; }
   anchorFiltros.forEach(elem => elem.classList.remove('selected'));
   event.target.classList.add('selected');

   for(const elemento of divTodoList.children){
       elemento.classList.remove('hidden');
       const completado = elemento.classList.contains('completed');
       switch (filtro) {
           case 'Pendientes':
               if(completado){
                   elemento.classList.add('hidden');
               }
           break;
           case 'Completados':
               if(!completado){
                   elemento.classList.add('hidden');
               }
           break;

       }
   }

});

const actualizarPendientes = () => {
    let total = 0;
    for(const elemento of divTodoList.children){
        const completado = elemento.classList.contains('completed');
        if(!completado){
            total++;
        }
    }
    cantidadPendiente.innerHTML= `${total} pendiente(s)`;
}
