import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  console.log(todo);
  return (
    <div style={{ textDecoration: todo.isChecked ? 'line-through' : '' }} className="todo">
      {todo.text}
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>x</button>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [ value, setValue ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
}

function App() {
  const [ todos, setTodos ] = useState([
    {
      text: 'Learn about react',
      isChecked: false
    },
    {
      text: 'Learn about more react',
      isChecked: false
    },
    {
      text: 'Learn about react',
      isChecked: false
    }
  ]);
  console.log('Todos', todos);

  const addTodo = (text) => {
    const newTodos = [ ...todos, { text } ];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [ ...todos ];
    newTodos[index].isChecked = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [ ...todos ];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
