import React, { useState } from "react";
import axios from "axios";

function Create({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    axios
      .post("http://localhost:3001/add", { task: task.trim() })
      .then((res) => {
        addTodo(res.data);
        setTask("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
}

export default Create;
