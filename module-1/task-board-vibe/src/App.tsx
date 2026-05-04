import { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { Task, ColumnId } from './types'
import { useTasks } from './hooks/useTasks'
import { KanbanColumn } from './components/KanbanColumn'
import { TaskCard } from './components/TaskCard'
import { TaskModal } from './components/TaskModal'
import { ShortcutsPanel } from './components/ShortcutsPanel'

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

type ModalState =
  | { type: 'closed' }
  | { type: 'create'; columnId: ColumnId }
  | { type: 'edit'; task: Task }

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks()
  const [modal, setModal] = useState<ModalState>({ type: 'closed' })
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const openCreate = useCallback((columnId: ColumnId = 'todo') => {
    setModal({ type: 'create', columnId })
  }, [])

  const openEdit = useCallback((task: Task) => {
    setModal({ type: 'edit', task })
  }, [])

  const closeModal = useCallback(() => setModal({ type: 'closed' }), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'n' || e.key === 'N') openCreate()
      if (e.key === '?') setShowShortcuts(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openCreate])

  function handleDragStart(event: DragStartEvent) {
    const task = event.active.data.current?.task as Task | undefined
    setActiveTask(task ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    const draggedTask = activeData?.task as Task | undefined
    if (!draggedTask) return

    const overColumnId = (overData?.columnId ?? overData?.task?.columnId) as ColumnId | undefined
    if (!overColumnId) return

    if (draggedTask.columnId !== overColumnId) {
      moveTask(draggedTask.id, overColumnId)
      return
    }

    if (overData?.type === 'task' && active.id !== over.id) {
      const colTasks = tasks.filter(t => t.columnId === draggedTask.columnId)
      const oldIdx = colTasks.findIndex(t => t.id === active.id)
      const newIdx = colTasks.findIndex(t => t.id === over.id)
      if (oldIdx !== -1 && newIdx !== -1) {
        const reordered = arrayMove(colTasks, oldIdx, newIdx)
        reordered.forEach((t, idx) => {
          if (tasks.indexOf(t) !== idx) updateTask(t.id, {})
        })
      }
    }
  }

  function handleSave(title: string, description: string, columnId: ColumnId) {
    if (modal.type === 'create') {
      addTask(title, description, columnId)
    } else if (modal.type === 'edit') {
      updateTask(modal.task.id, { title, description, columnId })
    }
  }

  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.columnId === 'done').length

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Task Board</h1>
          {totalTasks > 0 && (
            <span className="progress-badge">
              {doneTasks}/{totalTasks} done
            </span>
          )}
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowShortcuts(true)} title="Keyboard shortcuts (?)">
            ⌨ Shortcuts
          </button>
          <button className="btn-primary" onClick={() => openCreate()}>
            + New Task
          </button>
        </div>
      </header>

      <main className="board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks.filter(t => t.columnId === col.id)}
              onAddTask={openCreate}
              onEditTask={openEdit}
              onDeleteTask={deleteTask}
            />
          ))}

          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            )}
          </DragOverlay>
        </DndContext>
      </main>

      {modal.type !== 'closed' && (
        <TaskModal
          task={modal.type === 'edit' ? modal.task : undefined}
          defaultColumnId={modal.type === 'create' ? modal.columnId : undefined}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {showShortcuts && (
        <ShortcutsPanel onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  )
}
