import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch {
      toast.error('Could not connect to server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async (data) => {
    try {
      await createTask(data)
      await fetchTasks()
      toast.success('Task added!')
    } catch {
      toast.error('Failed to add task.')
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      await updateTask(id, data)
      setEditingTask(null)
      await fetchTasks()
      toast.success('Task updated!')
    } catch {
      toast.error('Failed to update task.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      await fetchTasks()
      toast.success('Task deleted.')
    } catch {
      toast.error('Failed to delete task.')
    }
  }

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending'
      await updateTask(task.id, { ...task, status: newStatus })
      await fetchTasks()
      toast.success(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened.')
    } catch {
      toast.error('Failed to update status.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          TaskFlow
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Stay organised. Get things done.
        </p>
        <TaskForm
          onSubmit={handleCreate}
          editingTask={editingTask}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTask(null)}
        />
        {loading ? (
          <div className="flex justify-center mt-16">
            <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={setEditingTask}
            onToggleStatus={handleStatusToggle}
          />
        )}
      </div>
    </div>
  )
}

export default App