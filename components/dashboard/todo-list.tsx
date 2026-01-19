"use client"

import { useState } from "react"
import { Check, Plus, Trash2, Calendar as CalendarIcon, Flag } from "lucide-react"
import { useStore, toggleTodo, addTodo, deleteTodo } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Priority } from "@/lib/types"

const categories = ["Work", "Personal", "Health", "Learning", "Other"]
const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "high", label: "High", color: "destructive" },
  { value: "medium", label: "Medium", color: "warning" },
  { value: "low", label: "Low", color: "muted-foreground" },
]

export function TodoList() {
  const { todos } = useStore()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>("medium")
  const [newTodoDueDate, setNewTodoDueDate] = useState("")
  const [newTodoCategory, setNewTodoCategory] = useState("Personal")

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo(
        newTodoTitle.trim(),
        newTodoPriority,
        newTodoDueDate || null,
        newTodoCategory
      )
      setNewTodoTitle("")
      setNewTodoPriority("medium")
      setNewTodoDueDate("")
      setNewTodoCategory("Personal")
      setIsAddOpen(false)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">To-Do List</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Review quarterly report"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setNewTodoPriority(p.value)}
                      className={cn(
                        "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all",
                        newTodoPriority === p.value
                          ? p.value === "high"
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : p.value === "medium"
                              ? "border-warning bg-warning/10 text-warning"
                              : "border-muted-foreground bg-muted text-muted-foreground"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTodoDueDate}
                  onChange={(e) => setNewTodoDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewTodoCategory(cat)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                        newTodoCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddTodo} className="w-full">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="mt-4 flex rounded-lg bg-secondary p-1">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
              filter === f
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo Items */}
      <div className="mt-4 space-y-2">
        {sortedTodos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No tasks yet. Create your first task!"
                : filter === "active"
                  ? "No active tasks. Great job!"
                  : "No completed tasks yet."}
            </p>
          </div>
        ) : (
          sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                todo.completed
                  ? "bg-muted/30 hover:bg-muted/50"
                  : "bg-secondary/50 hover:bg-secondary"
              )}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                  todo.completed
                    ? "border-success bg-success"
                    : todo.priority === "high"
                      ? "border-destructive hover:bg-destructive/10"
                      : todo.priority === "medium"
                        ? "border-warning hover:bg-warning/10"
                        : "border-muted-foreground/30 hover:border-primary"
                )}
              >
                {todo.completed && (
                  <Check className="h-3.5 w-3.5 text-success-foreground" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-medium transition-all duration-200 truncate",
                    todo.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {todo.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-0.5">
                    {todo.category}
                  </span>
                  {todo.dueDate && (
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(todo.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    todo.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : todo.priority === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  <Flag className="h-3 w-3" />
                  {todo.priority}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mt-6 rounded-xl bg-success/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Overall Progress
            </span>
            <span className="text-lg font-semibold text-success">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-success/10">
            <div
              className="h-full rounded-full bg-success transition-all duration-500"
              style={{
                width: `${Math.round((completedCount / totalCount) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
