import React, { useState, useEffect } from "react";
import Create from "./Create";
import "./home.css";
import axios from "axios";
import ThreeModel from "./ThreeModel";

function Home() {
  const [todos, setTodos] = useState([]);

 useEffect(() => {
  axios.get("https://dailychores-app-1.onrender.com/get")
    .then((res) => setTodos(res.data))
    .catch((err) => console.error(err));
}, []);


  const addTodo = (todo) => setTodos((prev) => [...prev, todo]);

 const removeTodo = (id) => {
  axios
    .delete(`https://dailychores-app-1.onrender.com/delete/${id}`)
    .then(() => setTodos((prev) => prev.filter((t) => t._id !== id)))
    .catch((err) => console.error(err));
};


  return (
    <div className="main-container">
      {/* Left Section */}
      <div className="left-section">
        <h2>TODO LIST</h2>
        <ThreeModel />
        <Create addTodo={addTodo} />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h3>Your Tasks</h3>
        {todos.length === 0 ? (
          <p className="empty-text">No todos available</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo._id}>
                <span>{todo.task}</span>
                <button
                  className="delete-btn"
                  onClick={() => removeTodo(todo._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
