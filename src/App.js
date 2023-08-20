import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [copytodos, setCopyTodos] = useState([]);
  const [select, setSelect] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const { data } = await axios.get(`https://dummyjson.com/todos`);
    setTodos(data.todos);
    setCopyTodos(data.todos);
  }
  function handleChange(e, idx) {
    let res = [...todos];
    res[idx].completed = e.target.checked;
    setTodos(res);
    setCopyTodos(res);
  }
  function handleSelect(e) {
    setSelect(e.target.checked);
    if (e.target.checked) {
      let newTodo = copytodos.filter((todo) => todo.completed);
      setTodos(newTodo);
    } else {
      let newTodo = copytodos.filter((todo) => todo.completed === false);
      setTodos(newTodo);
    }
  }
  return (
    <div className="App">
      <h1>Dynamic Checkbox</h1>
      <p>
        Select{" "}
        <input
          checked={select}
          type="checkbox"
          onChange={(e) => handleSelect(e)}
        />
      </p>
      {todos && todos.length > 0 && (
        <table style={{ border: 1 }}>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, idx) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.todo}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
