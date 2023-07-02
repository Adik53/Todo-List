import './App.css';
import {useState} from "react";
import Form from "../Form/Form";

function App() {
    const [todos, setTodos] = useState([]);
    const [allTodos, setAllTodos] = useState(0);
    const [allComplete, setAllComplete] = useState(0);
    const [editTodo, setEditTodo] = useState(null);

    const putTodo = (value) => {
        if (value) {
            setTodos([...todos, {id: Date.now(), text: value, done: false}]);
            setAllTodos(allTodos + 1);
        } else {
            alert("Bir şeyler yazmalısın");
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => {
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
        }));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setAllTodos(allTodos - 1);
        setAllComplete(allComplete - 1);
    };

    const editTodoItem = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        setEditTodo(todoToEdit);
    };

    const updateTodo = (id, newText) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: newText
                };
            }
            return todo;
        }));
        setEditTodo(null);
    };

    const clearTodos = () => {
        setTodos([]);
        setAllTodos(0);
        setAllComplete(0);
    };

    return (
        <div className="wrapper">
            <div className="container">
                <h1 className="title">TodoList</h1>
                <p>Adilet Kairzhanov 21703921</p>
                <Form putTodo={putTodo}/>
                <ul className="todos">
                    {todos.map((todo) => {
                        if (editTodo && editTodo.id === todo.id) {
                            return (
                                <li className={todo.done ? "todo done" : "todo"} key={todo.id}>
                                    <input
                                        type="text"
                                        value={editTodo.text}
                                        onChange={(e) => updateTodo(todo.id, e.target.value)}
                                    />
                                    <button className="save">Save</button>
                                    { }
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editTodoItem(todo.id);
                                        }}>
                                        ✏️
                                    </span> {}
                                </li>
                            );
                        }
                    })}
                </ul>
                <div className="info">
                    <span> Tüm Todolist: {allTodos}</span>
                    <span> Tamamlamak: {allComplete}</span>
                </div>
                <button className="clear" onClick={clearTodos}>Hepsini Sil</button>
            </div>
        </div>
    );
}

export default App;
