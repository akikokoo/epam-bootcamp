import { useState, useEffect } from 'react'
import type { Task, ColumnId } from '../types'
import { loadTasks, saveTasks } from '../storage'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function addTask(title: string, description: string, columnId: ColumnId = 'todo') {
    const task: Task = {
      id: generateId(),
      title,
      description,
      columnId,
      createdAt: Date.now(),
    }
    setTasks(prev => [...prev, task])
    return task.id
  }

  function updateTask(id: string, changes: Partial<Pick<Task, 'title' | 'description' | 'columnId'>>) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...changes } : t)))
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function moveTask(taskId: string, toColumnId: ColumnId) {
    updateTask(taskId, { columnId: toColumnId })
  }

  return { tasks, addTask, updateTask, deleteTask, moveTask }
}
