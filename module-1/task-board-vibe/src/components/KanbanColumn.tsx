import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Column, Task, ColumnId } from '../types'
import { TaskCard } from './TaskCard'

interface Props {
  column: Column
  tasks: Task[]
  onAddTask: (columnId: ColumnId) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

const COLUMN_COLORS: Record<ColumnId, string> = {
  'todo': '#6366f1',
  'in-progress': '#f59e0b',
  'done': '#10b981',
}

export function KanbanColumn({ column, tasks, onAddTask, onEditTask, onDeleteTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', columnId: column.id },
  })

  return (
    <div className={`kanban-column ${isOver ? 'drop-over' : ''}`}>
      <div className="column-header" style={{ borderTopColor: COLUMN_COLORS[column.id] }}>
        <div className="column-title-row">
          <span className="column-dot" style={{ backgroundColor: COLUMN_COLORS[column.id] }} />
          <h3 className="column-title">{column.title}</h3>
          <span className="task-count">{tasks.length}</span>
        </div>
        <button
          className="add-task-btn"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
        >
          +
        </button>
      </div>

      <div ref={setNodeRef} className="column-body">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="empty-column">Drop tasks here</div>
        )}
      </div>
    </div>
  )
}
