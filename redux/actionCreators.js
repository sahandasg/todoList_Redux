import {
    addTodo,
    removeTodo,
    toggleTodo,
    showFilteredTodos,
} from "./actions.js";

function addNewTodo(title) {
    return {
        type: addTodo,
        title
    }
}

function removeFromTodo(id) {
    return {
        type: removeTodo,
        id
    }
}

function toggleFromTodo(id) {
    return {
        type: toggleTodo,
        id
    }
}

function showTodos() {
    return {
        type: showFilteredTodos,
    }
}

export {
    addNewTodo,
    removeFromTodo,
    toggleFromTodo,
    showTodos,
}