import './App.css'
import {useState} from "react";
import Form from "../Form/Form";


function App() {
    const [todos,setTodos] = useState([])
    const [allTodos,setAllTodos] = useState(0)
    const [allComplete,setAllComplete] = useState(0)

    const putTodo =(value) =>{
        if (value){
            setTodos([...todos,{id: Date.now(), text: value, done:false}])
            setAllTodos(allTodos +1)
        }
        else {
            alert("bir şeyler yazmalısın")
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
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

    const removeTodo = (id) =>{
        setTodos(todos.filter(todo => todo.id !==id))
        setAllTodos(allTodos -1)
        setAllComplete(allComplete -1)
    }

    const clearTodos = () => {
      setTodos([]);
      setAllTodos(0)
            setAllComplete(0)
    }

  return(
      <div className="wrapper">
          <div className="container">
              <h1 className="title">TodoList</h1>
              <p>Adilet Kairzhanov 21703921</p>
              <Form
                  putTodo={putTodo}
              />
              <ul className= "todos">
                  {
                      todos.map(todo =>{
                          return (
                              <li className={todo.done ? "todo done" : "todo"} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                                  {todo.text}
                                  <span className="delete" onClick={e => {e.stopPropagation(); removeTodo(todo.id); }}>
                                      ❌
                                  </span>
                              </li>
                          )
                      })
                  }
                  <div className="info">
                      <span> Tüm Todolist: {allTodos}</span>
                      <span> Tamamlamak: {allComplete}</span>
                  </div>
                  <button className="clear" onClick={clearTodos}>Hepsini Sil</button>
              </ul>
          </div>
      </div>
  )
}
export default App;