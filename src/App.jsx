import { useContext, useRef, useState } from 'react'
import './App.css'
import { ThemeContext } from './Themecontext';


function App() {
  let [displayTask, setDisplayTask] = useState([])
  const [task, setTask] = useState([]);
  const text = useRef(null)

  const { theme, setTheme } = useContext(ThemeContext)
  const switchMode = () => {
    const value = theme == 'light' ? 'dark' : 'light'
    setTheme(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let t = text.current.value.trim()
    t === "" ? false : displayTask.push({ task: t, status: "not-completed" });
    setDisplayTask([...displayTask])
    setTask([...displayTask])
    text.current.value = ' '
  }
  const handleChecked = (e) => {
    task[e].status = "completed"
    setTask([...task])
  }
  const removeChecked = (e) => {
    task[e].status = "not-completed"
    setTask([...task])
  }
  const handleDelete = (e) => {
    displayTask.splice(e, 1)
    setTask([...displayTask])
  }
  const handleFilter = (data) => {
    const result = displayTask.filter(item => {
      return item.status === data
    }
    )
    setTask([...result])
  }
  const handleClear = () => {
    displayTask = []
    setTask([...displayTask])
  }

  return (
    <main className={`${theme === 'light' ? 'bg-white' : 'bg-slate-900'} w-full h-[100vh]`}>
      <div className={`${theme === 'light' ? 'top-light' : 'top-dark'}  flex flex-col justify-center items-center`}>
        <div className='mx-auto wide  h-auto flex flex-col gap-10'>

          <div className='flex  justify-between items-center w-full'>
            <h4 className='font-semibold text-white text-3xl tracking-widest'>TODO</h4>
            <button onClick={switchMode}>
              {theme === 'light' ? <img src="/images/icon-moon.svg" alt="" /> :
                <img src="/images/icon-sun.svg" alt="" />}
            </button>
          </div>

          <div className='w-full  h-auto flex flex-col gap-10 relative'>
            <form className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800 text-white'} w-full drop-shadow-lg h-14 rounded-md flex pl-4 pr-4 gap-4 items-center`} onSubmit={handleSubmit}>
              <input type="text" ref={text} className=' h-14   bg-transparent border-none outline-none w-full' placeholder='Create a new todo....' />
              <button className='shadow-lg'>
                <img src="/images/favicon-32x32.png" alt="" />
              </button>
            </form>

            <div className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800 text-white'} w-full drop-shadow-lg  h-auto rounded-md flex flex-col  items-center absolute top-20`}>
              {task.map((item, index) =>
                <div className='w-full  h-14 hove flex pl-4  pr-4 gap-4 justify-between items-center border-b border-slate-300 ' key={index}>
                  <div className='flex gap-3 items-center w-11/12'>
                    <div>
                      {task[index].status === 'completed' ?
                        <button className='circle w-7 h-7 rounded-full  flex justify-center items-center' onClick={() => removeChecked(index)}>
                          <img src="/images/icon-check.svg" alt="" />
                        </button>

                        :
                        <button className='w-7 h-7 rounded-full border border-slate-700 flex justify-center items-center' onClick={() => handleChecked(index)}>
                        </button>
                      }
                    </div>
                    <span className={`${task[index].status === 'completed' ? 'checked text-slate-300 overflow-hidden'
                      : 'text-slate-400'} overflow-hidden`}>{item.task}</span>
                  </div>

                  <button className='none' onClick={() => handleDelete(index)}><img src="/images/icon-cross.svg" alt="" /></button>

                </div>
              )}

              <div className='w-full h-14 text-slate-500 text-xs flex pl-4 pr-4 gap-4 items-center rounded-b-md shadow-md justify-between'>
                <span>{task.length <= 0 ? 'No' : task.length} items left</span>
                {/* <div className='flex gap-4'>
                  <button className='focus-within:text-blue-500' onClick={() => setTask([...displayTask])}>All</button>
                  <button className='focus-within:text-blue-500' onClick={() => handleFilter('not-completed')}>Active</button>
                  <button className='focus-within:text-blue-500' onClick={() => handleFilter('completed')}>Completed</button>
                </div> */}
                <button className='hover:text-blue-600' onClick={handleClear}>Clear Completed</button>
              </div>
              <div className='flex gap-4  sticky text-slate-500  top-48 w-full justify-center py-2'>
                <button className='focus-within:text-blue-500' onClick={() => setTask([...displayTask])}>All</button>
                <button className='focus-within:text-blue-500' onClick={() => handleFilter('not-completed')}>Active</button>
                <button className='focus-within:text-blue-500' onClick={() => handleFilter('completed')}>Completed</button>
              </div>
            </div>


          </div>


        </div>

      </div>
    </main>
  )
}

export default App
