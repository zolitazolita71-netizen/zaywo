"use client"

import { useStore } from "@/lib/store"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push({
      date: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
    })
  }
  return days
}

export function Analytics() {
  const { habits, todos } = useStore()

  const last7Days = getLast7Days()

  // Calculate habit completion data for the last 7 days
  const dailyHabits = habits.filter((h) => h.frequency === "daily")
  const habitData = last7Days.map((day) => {
    const completed = dailyHabits.filter((h) =>
      h.completedDates.includes(day.date)
    ).length
    const total = dailyHabits.length
    return {
      name: day.label,
      completed,
      rate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })

  // Calculate category breakdown for todos
  const categoryData = todos.reduce(
    (acc, todo) => {
      const existing = acc.find((c) => c.name === todo.category)
      if (existing) {
        existing.total++
        if (todo.completed) existing.completed++
      } else {
        acc.push({
          name: todo.category,
          total: 1,
          completed: todo.completed ? 1 : 0,
        })
      }
      return acc
    },
    [] as { name: string; total: number; completed: number }[]
  )

  // Calculate streaks summary
  const activeStreaks = habits.filter((h) => h.streak > 0).length
  const averageStreak =
    habits.length > 0
      ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length)
      : 0

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Your productivity insights at a glance
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Habit Completion Trend */}
        <div className="rounded-xl bg-secondary/30 p-4">
          <h3 className="text-sm font-medium text-foreground">
            7-Day Habit Completion
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Daily completion rate over the past week
          </p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={habitData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  formatter={(value: number) => [`${value}%`, "Completion"]}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#colorRate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Categories */}
        <div className="rounded-xl bg-secondary/30 p-4">
          <h3 className="text-sm font-medium text-foreground">
            Tasks by Category
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Distribution of your tasks
          </p>
          <div className="mt-4 h-48">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    formatter={(value: number, name: string) => [
                      value,
                      name === "total" ? "Total" : "Completed",
                    ]}
                  />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={colors[index % colors.length]}
                        fillOpacity={0.3}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="completed" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-completed-${entry.name}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">No tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-chart-1/10 p-4">
          <p className="text-sm text-muted-foreground">Active Streaks</p>
          <p className="mt-1 text-2xl font-semibold text-chart-1">
            {activeStreaks}
          </p>
          <p className="text-xs text-muted-foreground">
            of {habits.length} habits
          </p>
        </div>
        <div className="rounded-xl bg-chart-2/10 p-4">
          <p className="text-sm text-muted-foreground">Average Streak</p>
          <p className="mt-1 text-2xl font-semibold text-chart-2">
            {averageStreak} days
          </p>
          <p className="text-xs text-muted-foreground">across all habits</p>
        </div>
        <div className="rounded-xl bg-chart-3/10 p-4">
          <p className="text-sm text-muted-foreground">Task Completion</p>
          <p className="mt-1 text-2xl font-semibold text-chart-3">
            {todos.length > 0
              ? Math.round(
                  (todos.filter((t) => t.completed).length / todos.length) * 100
                )
              : 0}
            %
          </p>
          <p className="text-xs text-muted-foreground">
            {todos.filter((t) => t.completed).length} of {todos.length} tasks
          </p>
        </div>
      </div>
    </div>
  )
}
