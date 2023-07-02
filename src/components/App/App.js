import './App.css';
import { useState } from "react";
import Form from "../Form/Form";

function App() {
    const [todos, setTodos] = useState([]);
    const [allTodos, setAllTodos] = useState(0);
    const [allComplete, setAllComplete] = useState(0);
    const [editTodo, setEditTodo] = useState(null);

    const putTodo = (value) => {
        if (value) {
            setTodos([...todos, { id: Date.now(), text: value, done: false }]);
            setAllTodos(allTodos + 1);
        } else {
            alert("Please enter a valid todo.");
        }
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id !== id) return todo;

                const updatedTodo = {
                    ...todo,
                    done: !todo.done
                };

                if (updatedTodo.done) {
                    setAllComplete(allComplete + 1);
                } else {
                    setAllComplete(allComplete - 1);
                }

                return updatedTodo;
            })
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setAllTodos(allTodos - 1);
        if (editTodo && editTodo.id === id) {
            setEditTodo(null);
        }
    };

    const editTodoItem = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        if (todoToEdit) {
            setEditTodo({
                id: todoToEdit.id,
                text: todoToEdit.text
            });
        }
    };

    const updateTodo = (id, updatedText) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id !== id) return todo;

                return {
                    ...todo,
                    text: updatedText
                };
            })
        );
        setEditTodo(null);
    };

    const clearTodos = () => {
        setTodos([]);
        setAllTodos(0);
        setAllComplete(0);
        setEditTodo(null);
    };

    return (
        <div className="wrapper">
            <div className="container">
                <h1 className="title">TodoList</h1>
                <Form putTodo={putTodo} />
                <ul className="todos">
                    {todos.map((todo) => {
                        if (editTodo && editTodo.id === todo.id) {
                            return (
                                <li className="todo" key={todo.id}>
                                    <input
                                        type="text"
                                        value={editTodo.text}
                                        onChange={(e) =>
                                            setEditTodo({
                                                ...editTodo,
                                                text: e.target.value
                                            })
                                        }
                                    />
                                    <button
                                        className="save"
                                        onClick={() => updateTodo(editTodo.id, editTodo.text)}
                                    >
                                        Save
                                    </button>
                                </li>
                            );
                        } else {
                            return (
                                <li
                                    className={todo.done ? "todo done" : "todo"}
                                    key={todo.id}
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    {todo.text}
                                    <span
                                        className="delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTodo(todo.id);
                                        }}>
                                        ❌
                                    </span>
                                    <span
                                        className="edit"
                                        onClick={() => editTodoItem(todo.id)}>
                                        ✎
                                    </span>
                                </li>
                            );
                        }
                    })}
                </ul>
                <div className="info">
                    <span>All todos: {allTodos}</span>
                    <span>Complete: {allComplete}</span>
                </div>
                <button className="clear" onClick={clearTodos}>
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default App;
