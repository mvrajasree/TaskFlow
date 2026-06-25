import TaskCard from './TaskCard'

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  const pending = tasks.filter(t => t.status === 'pending')
  const completed = tasks.filter(t => t.status === 'completed')

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No tasks yet. Add one above!
      </p>
    )
  }

  return (
    <div>
      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Pending ({pending.length})
          </h3>
          {pending.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Completed ({completed.length})
          </h3>
          {completed.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList