const priorityStyles = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-green-100 text-green-600',
}

function TaskCard({ task, onDelete, onEdit, onToggleStatus }) {
  const isCompleted = task.status === 'completed'
  const priority = task.priority || 'medium'

  return (
    <div className={`bg-white rounded-xl shadow p-4 mb-3 flex items-start justify-between gap-4 ${isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleStatus(task)}
          className="mt-1 w-4 h-4 accent-indigo-600 cursor-pointer"
        />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[priority]}`}>
              {priority}
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
          {task.due_date && (
            <p className="text-xs text-indigo-400 mt-1">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-indigo-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard