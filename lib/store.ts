"use client"

import { useSyncExternalStore } from "react"
import type { Habit, Todo, HabitFrequency, Priority } from "./types"

type View = "daily" | "weekly" | "monthly"

interface Store {
  habits: Habit[]
  todos: Todo[]
  selectedDate: string
  view: View
}

const defaultHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Exercise",
    icon: "dumbbell",
    color: "chart-1",
    frequency: "daily",
    completedDates: [
      "2026-01-13",
      "2026-01-14",
      "2026-01-15",
      "2026-01-16",
      "2026-01-17",
      "2026-01-18",
      "2026-01-19",
    ],
    createdAt: "2026-01-01",
    streak: 7,
  },
  {
    id: "2",
    name: "Read 30 mins",
    icon: "book",
    color: "chart-2",
    frequency: "daily",
    completedDates: ["2026-01-17", "2026-01-18", "2026-01-19"],
    createdAt: "2026-01-01",
    streak: 3,
  },
  {
    id: "3",
    name: "Meditate",
    icon: "brain",
    color: "chart-3",
    frequency: "daily",
    completedDates: ["2026-01-15", "2026-01-16", "2026-01-18"],
    createdAt: "2026-01-01",
    streak: 0,
  },
  {
    id: "4",
    name: "Drink 8 glasses",
    icon: "droplet",
    color: "chart-4",
    frequency: "daily",
    completedDates: [
      "2026-01-12",
      "2026-01-13",
      "2026-01-14",
      "2026-01-15",
      "2026-01-16",
      "2026-01-17",
      "2026-01-18",
      "2026-01-19",
    ],
    createdAt: "2026-01-01",
    streak: 8,
  },
  {
    id: "5",
    name: "Weekly Review",
    icon: "calendar",
    color: "chart-5",
    frequency: "weekly",
    completedDates: ["2026-01-12", "2026-01-19"],
    createdAt: "2026-01-01",
    streak: 2,
  },
]

const defaultTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    priority: "high",
    dueDate: "2026-01-20",
    category: "Work",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    title: "Review quarterly goals",
    completed: false,
    priority: "medium",
    dueDate: "2026-01-21",
    category: "Personal",
    createdAt: "2026-01-16",
  },
  {
    id: "3",
    title: "Schedule dentist appointment",
    completed: true,
    priority: "low",
    dueDate: "2026-01-19",
    category: "Health",
    createdAt: "2026-01-14",
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    completed: false,
    priority: "high",
    dueDate: "2026-01-22",
    category: "Work",
    createdAt: "2026-01-17",
  },
  {
    id: "5",
    title: "Buy groceries",
    completed: false,
    priority: "medium",
    dueDate: "2026-01-19",
    category: "Personal",
    createdAt: "2026-01-18",
  },
]

let store: Store = {
  habits: defaultHabits,
  todos: defaultTodos,
  selectedDate: new Date().toISOString().split("T")[0],
  view: "daily",
}

const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot() {
  return store
}

export function getServerSnapshot() {
  return store
}

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function setView(view: View) {
  store = { ...store, view }
  emitChange()
}

export function setSelectedDate(date: string) {
  store = { ...store, selectedDate: date }
  emitChange()
}

export function toggleHabit(habitId: string, date: string) {
  store = {
    ...store,
    habits: store.habits.map((habit) => {
      if (habit.id !== habitId) return habit
      const isCompleted = habit.completedDates.includes(date)
      const completedDates = isCompleted
        ? habit.completedDates.filter((d) => d !== date)
        : [...habit.completedDates, date]

      // Calculate streak
      let streak = 0
      const today = new Date()
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today)
        checkDate.setDate(checkDate.getDate() - i)
        const dateStr = checkDate.toISOString().split("T")[0]
        if (completedDates.includes(dateStr)) {
          streak++
        } else if (i > 0) {
          break
        }
      }

      return { ...habit, completedDates, streak }
    }),
  }
  emitChange()
}

export function addHabit(
  name: string,
  icon: string,
  color: string,
  frequency: HabitFrequency
) {
  const newHabit: Habit = {
    id: Date.now().toString(),
    name,
    icon,
    color,
    frequency,
    completedDates: [],
    createdAt: new Date().toISOString().split("T")[0],
    streak: 0,
  }
  store = { ...store, habits: [...store.habits, newHabit] }
  emitChange()
}

export function deleteHabit(habitId: string) {
  store = {
    ...store,
    habits: store.habits.filter((h) => h.id !== habitId),
  }
  emitChange()
}

export function addTodo(
  title: string,
  priority: Priority,
  dueDate: string | null,
  category: string
) {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
    priority,
    dueDate,
    category,
    createdAt: new Date().toISOString().split("T")[0],
  }
  store = { ...store, todos: [...store.todos, newTodo] }
  emitChange()
}

export function toggleTodo(todoId: string) {
  store = {
    ...store,
    todos: store.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ),
  }
  emitChange()
}

export function deleteTodo(todoId: string) {
  store = {
    ...store,
    todos: store.todos.filter((t) => t.id !== todoId),
  }
  emitChange()
}
