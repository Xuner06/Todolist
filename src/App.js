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
    if(window.confirm('Are you sure you want to delete?')){
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

  const noTask = (props) => {
    if(props.length <= 0) {
      return (
        <tr>
          <td colSpan={2}>No Task Yet Please Add Task</td>
        </tr>

      )
    }
  }
  
  return (
    <div className='w-screen h-screen bg-slate-400 overflow-auto'>
      <div className='bg-white rounded-lg p-4 w-1/2 my-4 mx-auto flex justify-center'>
        <form onSubmit={addTask}>
          <input className='border-2 border-black mr-2 text-center' type='text' onChange={handleChange} required/>
          <button className='bg-cyan-500 p-2 rounded-full text-white text-xs' type='submit'>Add Task</button>
        </form>
      </div>
      <div className='bg-white rounded-lg w-1/2 mb-4 mx-auto p-4'>
        <table className='mx-auto border-collapse border border-slate-400'>
          <thead>
            <tr>
              <th className='border-2 border-slate-400'>List</th>
              <th className='border-2 border-slate-400'>Action</th>
            </tr>
          </thead>
          <tbody className='border-2 border-slate-400'>
          {todoList.map((task) => {
            return(
              <tr>
                <td className='border-2 border-slate-400 px-2 text-center'>
                  <h5 style={{color: task.completed ? 'green' : 'black'}}>{task.taskName}</h5>
                </td>
                <td className='border-2 border-slate-400 p-2 space-x-1'>
                  <button className='bg-cyan-500 p-2 rounded-full text-white text-xs' onClick={() => completeTask(task.id)}>Done</button>
                  <button className='bg-red-500 p-2 rounded-full text-white text-xs' onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
          {noTask(todoList)}
          </tbody>
        </table>
      </div>
  
    </div>
    
  );
}

export default App;
