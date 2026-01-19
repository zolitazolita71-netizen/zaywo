"use client"

import { Check, Circle } from "lucide-react"
import { useStore, toggleHabit, toggleTodo } from "@/lib/store"
import { cn } from "@/lib/utils"

export function TodayFocus() {
  const { habits, todos } = useStore()

  const today = new Date().toISOString().split("T")[0]
  const dailyHabits = habits.filter((h) => h.frequency === "daily")
  const todaysTodos = todos.filter(
    (t) => t.dueDate === today || (!t.dueDate && !t.completed)
  ).slice(0, 5)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Today&apos;s Focus</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Your habits and priority tasks for today
      </p>

      <div className="mt-6 space-y-6">
        {/* Daily Habits */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Daily Habits
          </h3>
          <div className="mt-3 space-y-2">
            {dailyHabits.map((habit) => {
              const isCompleted = habit.completedDates.includes(today)
              return (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id, today)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                    isCompleted
                      ? "bg-success/10 hover:bg-success/15"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
                      isCompleted
                        ? "border-success bg-success"
                        : "border-muted-foreground/30 group-hover:border-primary"
                    )}
                  >
                    {isCompleted && <Check className="h-3.5 w-3.5 text-success-foreground" />}
                  </div>
                  <span
                    className={cn(
                      "flex-1 font-medium transition-all duration-200",
                      isCompleted
                        ? "text-success line-through"
                        : "text-foreground"
                    )}
                  >
                    {habit.name}
                  </span>
                  {habit.streak > 0 && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {habit.streak} day streak
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Today's Tasks */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Priority Tasks
          </h3>
          <div className="mt-3 space-y-2">
            {todaysTodos.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No tasks for today
              </p>
            ) : (
              todaysTodos.map((todo) => (
                <button
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                    todo.completed
                      ? "bg-muted/50 hover:bg-muted"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
                      todo.completed
                        ? "border-muted-foreground/50 bg-muted-foreground/50"
                        : todo.priority === "high"
                          ? "border-destructive group-hover:border-destructive"
                          : todo.priority === "medium"
                            ? "border-warning group-hover:border-warning"
                            : "border-muted-foreground/30 group-hover:border-primary"
                    )}
                  >
                    {todo.completed && (
                      <Check className="h-3.5 w-3.5 text-background" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "flex-1 font-medium transition-all duration-200",
                      todo.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    )}
                  >
                    {todo.title}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      todo.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : todo.priority === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {todo.priority}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
