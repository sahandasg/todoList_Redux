import {
    addTodo,
    removeTodo,
    toggleTodo,
    showFilteredTodos,
} from "../redux/actions.js";
import {
    addNewTodo,
    removeFromTodo,
    toggleFromTodo,
    showTodos,
} from "../redux/actionCreators.js";

window.removeTodoHandler = removeTodoHandler
window.changeStatusHandler = changeStatusHandler

const todoInput = document.querySelector(".todo-input")
const todoList = document.querySelector(".todo-list")
const addTodoBtn = document.querySelector(".todo-button")
const filterTodosElm = document.querySelector(".filter-todo")

function todoReducer(state = [], action) {
    switch (action.type) {
        case addTodo: {
            const newState = [...state]
            const newTodo = {
                id: crypto.randomUUID(),
                title: action.title,
                status: false
            }
            newState.push(newTodo)
            return newState
        }
        case removeTodo: {
            const newState = [...state]
            return newState.filter((todo) => todo.id !== action.id)
        }
        case toggleTodo: {
            const newState = [...state]
            const completedTodo = newState.find((todo) => todo.id === action.id)
            completedTodo.status = !completedTodo.status
            return newState
        }
        case showFilteredTodos: {
            return state
        }
    }
}

function removeTodoHandler(id) {
    store.dispatch(removeFromTodo(id))
    const todos = store.getState()
    renderStateInDom(todos)
}

function changeStatusHandler(id) {
    store.dispatch(toggleFromTodo(id))
    const todos = store.getState()
    renderStateInDom(todos)
}

function renderStateInDom(todos) {
    todoList.innerHTML = "";
    todos.map((todo) => {
        todoList.insertAdjacentHTML("beforeend", ` <div class="todo">
            <li class="${todo.status ? "todo-item completed" : "todo-item"}">${todo.title}</li>
            <button class="complete-btn" onclick=changeStatusHandler("${todo.id}")>
                <i class="fas fa-check-circle"></i>
            </button>
            <button class="trash-btn" onclick=removeTodoHandler("${todo.id}")>
                <i class="fas fa-trash"></i>
            </button>
        </div>`)
    })

}

const store = Redux.createStore(todoReducer)

addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newTodoTitle = todoInput.value
    todoInput.value = ""
    if (newTodoTitle) {
        store.dispatch(addNewTodo(newTodoTitle))
    }
    const todos = store.getState()
    renderStateInDom(todos)
})

filterTodosElm.addEventListener("change", (e) => {
    store.dispatch(showTodos())
    const todos = store.getState()
    if (e.target.value === "all") {
        renderStateInDom(todos)
    } else if (e.target.value === "completed") {
        renderStateInDom(todos.filter((todo) => todo.status))
    } else {
        renderStateInDom(todos.filter((todo) => !todo.status))
    }
})