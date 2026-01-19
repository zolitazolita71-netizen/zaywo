export type Priority = "low" | "medium" | "high"
export type HabitFrequency = "daily" | "weekly" | "monthly"

export interface Habit {
  id: string
  name: string
  icon: string
  color: string
  frequency: HabitFrequency
  completedDates: string[]
  createdAt: string
  streak: number
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  dueDate: string | null
  category: string
  createdAt: string
}

export interface AppState {
  habits: Habit[]
  todos: Todo[]
  selectedDate: string
  view: "daily" | "weekly" | "monthly"
}
