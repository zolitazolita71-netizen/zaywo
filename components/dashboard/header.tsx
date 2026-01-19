"use client"

import { CalendarDays, Flame, Target } from "lucide-react"
import { useStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const { habits, todos, selectedDate } = useStore()

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  const todayStr = today.toISOString().split("T")[0]
  const completedHabitsToday = habits.filter((h) =>
    h.completedDates.includes(todayStr)
  ).length
  const totalHabitsToday = habits.filter((h) => h.frequency === "daily").length
  const longestStreak = Math.max(...habits.map((h) => h.streak), 0)
  const pendingTodos = todos.filter((t) => !t.completed).length

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Good {today.getHours() < 12 ? "morning" : today.getHours() < 18 ? "afternoon" : "evening"}
              </h1>
              <p className="mt-1 text-muted-foreground">{formattedDate}</p>
            </div>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Progress</p>
                <p className="text-lg font-semibold text-foreground">
                  {completedHabitsToday}/{totalHabitsToday} habits
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                <Flame className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="text-lg font-semibold text-foreground">{longestStreak} days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                <CalendarDays className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-lg font-semibold text-foreground">{pendingTodos} tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
