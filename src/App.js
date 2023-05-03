import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [id, setId] = useState(1);
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  const addTask = (event) => {
    const newTask = {
      id: id,
      taskName: task,
      completed: false,
    }
    setTodoList([...todoList, newTask]);
    setId(id + 1);
    event.target.reset();
    event.preventDefault();
  }

  const deleteTask = (id) => {
    if(window.confirm('Delete?')){
      setTodoList(todoList.filter((task) => task.id !== id));
    }
  }

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if(task.id === id) {
          return { ...task, completed: true };
        }
        else {
          return task;
        }
      })
    )
  }
  return (
    <div className='w-screen h-screen bg-slate-400 overflow-auto'>
      <div className='bg-white rounded-lg p-4 w-1/2 my-4 mx-auto flex justify-center '>
        <form onSubmit={addTask}>
          <input className='border-2 border-black mr-2 text-center' type='text' onChange={handleChange} required/>
          <button className='bg-blue-500' type='submit'>Add Task</button>
        </form>
      </div>
      <div className='bg-white rounded-lg w-1/2 mb-4 mx-auto'>
        <table className='mx-auto'>
          <thead>
            <tr>
              <th>List</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {todoList.map((task) => {
            return(
              <tr>
                <td><h5 style={{color: task.completed ? 'green' : 'black'}}>{task.taskName}</h5></td>
                <td>
                  <button onClick={() => completeTask(task.id)}>Done</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
  
    </div>
    
  );
}

export default App;
