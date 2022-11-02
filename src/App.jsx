import { useRef, useState } from 'react'
import './App.css'
function App() {
  const [task, setTask] = useState([]);
  const [completed, setCompleted] = useState([])
  const text = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    let t = text.current.value.trim()
    t === "" ? false : task.push({ task: t, status: "not-completed" });
    setTask([...task])
    text.current.value = ' '
    console.log(task)

  }
  const handleChecked = (e) => {
    task[e].status = "completed"
    console.log(task[e])

  }
  const removeChecked = (e) => {
    task[e].status = "not-completed"
    console.log(task[e])
  }
  const handleDelete = (e) => {
    task.splice(e, 1)
    setTask([...task])
  }
  return (
    <main className='bg-slate-900 w-full h-[100vh]'>
      <div className='top flex flex-col justify-center items-center'>
        <div className='mx-auto w-2/5  h-auto flex flex-col gap-10'>

          <div className='flex  justify-between items-center w-full'>
            <h4 className='font-semibold text-white text-3xl tracking-widest'>TODO</h4>
            <button>
              <img src="/images/icon-sun.svg" alt="" />
            </button>
          </div>

          <div className='w-full  h-auto flex flex-col gap-10 relative'>
            <form className='w-full shadow-md bg-slate-800 h-14 rounded-md flex pl-4 pr-4 gap-4 items-center' onSubmit={handleSubmit}>

              <input type="text" ref={text} className=' h-14 text-white  bg-transparent border-none outline-none w-full' placeholder='Create a new todo....' />
              <button>
                <img src="/images/favicon-32x32.png" alt="" />
              </button>
            </form>

            <div className='w-full shadow-md bg-slate-800 h-auto rounded-md flex flex-col  items-center absolute top-20'>
              {task.map((item, index) =>
                <div className='w-full h-14  flex pl-4  pr-4 gap-4 justify-between items-center border-b-2 border-slate-700 ' key={index}>
                  <div className='flex gap-5 items-center'>
                    {task[index].status === 'completed' ?
                      <button className='circle w-7 h-7 rounded-full  flex justify-center items-center' onClick={() => removeChecked(index)}>
                        <img src="/images/icon-check.svg" alt="" />
                      </button>

                      :
                      <button className='w-7 h-7 rounded-full border-2 border-slate-600 flex justify-center items-center' onClick={() => handleChecked(index)}>
                      </button>
                    }
                    <span className={task[index].status === 'completed' ? 'checked' : 'text-white'}>{item.task}</span>
                  </div>
                  <button onClick={() => handleDelete(index)}><img src="/images/icon-cross.svg" alt="" /></button>
                </div>
              )}

              <div className='w-full h-14 text-slate-500 text-xs flex pl-4 pr-4 gap-4 items-center rounded-b-md shadow-md justify-between'>
                <span>{task.length <= 0 ? 'No' : task.length} items left</span>
                <div className='flex gap-4'>
                  <button className='focus-within:text-blue-500'>All</button>
                  <button className='focus-within:text-blue-500'>Active</button>
                  <button className='focus-within:text-blue-500'>Completed</button>
                </div>
                <button className='hover:text-blue-600'>Clear Completed</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default App
