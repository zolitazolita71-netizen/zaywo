"use client"

import React from "react"

import { useState } from "react"
import {
  Check,
  Plus,
  Flame,
  Book,
  Dumbbell,
  Brain,
  Droplet,
  Calendar,
  X,
  Trash2,
} from "lucide-react"
import { useStore, toggleHabit, addHabit, deleteHabit, setView } from "@/lib/store"
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
import type { HabitFrequency } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dumbbell: Dumbbell,
  book: Book,
  brain: Brain,
  droplet: Droplet,
  calendar: Calendar,
  flame: Flame,
}

const colorOptions = [
  { name: "chart-1", label: "Blue" },
  { name: "chart-2", label: "Teal" },
  { name: "chart-3", label: "Yellow" },
  { name: "chart-4", label: "Pink" },
  { name: "chart-5", label: "Orange" },
]

const iconOptions = ["dumbbell", "book", "brain", "droplet", "calendar", "flame"]

function getWeekDates(offset = 0) {
  const today = new Date()
  const dates = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i + offset * 7)
    dates.push(date)
  }
  return dates
}

function getMonthDates() {
  const today = new Date()
  const dates = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date)
  }
  return dates
}

export function HabitTracker() {
  const { habits, view } = useStore()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newHabitName, setNewHabitName] = useState("")
  const [newHabitIcon, setNewHabitIcon] = useState("flame")
  const [newHabitColor, setNewHabitColor] = useState("chart-1")
  const [newHabitFrequency, setNewHabitFrequency] = useState<HabitFrequency>("daily")

  const weekDates = getWeekDates()
  const monthDates = getMonthDates()

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit(newHabitName.trim(), newHabitIcon, newHabitColor, newHabitFrequency)
      setNewHabitName("")
      setNewHabitIcon("flame")
      setNewHabitColor("chart-1")
      setNewHabitFrequency("daily")
      setIsAddOpen(false)
    }
  }

  const filteredHabits =
    view === "daily"
      ? habits.filter((h) => h.frequency === "daily")
      : view === "weekly"
        ? habits
        : habits

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Habit Tracker</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your daily habits and build streaks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-secondary p-1">
            {(["daily", "weekly", "monthly"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  view === v
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Habit Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Morning meditation"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map((icon) => {
                      const Icon = iconMap[icon]
                      return (
                        <button
                          key={icon}
                          onClick={() => setNewHabitIcon(icon)}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all",
                            newHabitIcon === icon
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setNewHabitColor(color.name)}
                        className={cn(
                          "h-10 w-10 rounded-lg border-2 transition-all",
                          newHabitColor === color.name
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105"
                        )}
                        style={{
                          backgroundColor: `var(--${color.name})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <div className="flex gap-2">
                    {(["daily", "weekly", "monthly"] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setNewHabitFrequency(freq)}
                        className={cn(
                          "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all",
                          newHabitFrequency === freq
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAddHabit} className="w-full">
                  Create Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredHabits.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No habits yet. Create your first habit to get started!
            </p>
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const Icon = iconMap[habit.icon] || Flame
            const dates = view === "monthly" ? monthDates : weekDates

            return (
              <div
                key={habit.id}
                className="group rounded-xl bg-secondary/30 p-4 transition-all hover:bg-secondary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `var(--${habit.color})20` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: `var(--${habit.color})` }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{habit.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{habit.frequency}</span>
                        {habit.streak > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-accent">
                              <Flame className="h-3.5 w-3.5" />
                              {habit.streak} day streak
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>

                {/* Habit Grid */}
                <div className="mt-4 flex items-center gap-1">
                  {dates.map((date) => {
                    const dateStr = date.toISOString().split("T")[0]
                    const isCompleted = habit.completedDates.includes(dateStr)
                    const isToday =
                      dateStr === new Date().toISOString().split("T")[0]

                    return (
                      <button
                        key={dateStr}
                        onClick={() => toggleHabit(habit.id, dateStr)}
                        className={cn(
                          "relative flex-1 transition-all duration-200",
                          view === "monthly" ? "aspect-square max-w-3" : "aspect-square"
                        )}
                        title={date.toLocaleDateString()}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 rounded-md transition-all duration-200",
                            isCompleted
                              ? "scale-100"
                              : "scale-90 opacity-30",
                            isToday && !isCompleted && "ring-2 ring-primary ring-offset-1 ring-offset-card"
                          )}
                          style={{
                            backgroundColor: isCompleted
                              ? `var(--${habit.color})`
                              : "var(--muted)",
                          }}
                        />
                        {isCompleted && (
                          <Check className="absolute inset-0 m-auto h-3 w-3 text-white" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Day Labels for Weekly View */}
                {view !== "monthly" && (
                  <div className="mt-1 flex items-center gap-1">
                    {dates.map((date) => (
                      <div
                        key={date.toISOString()}
                        className="flex-1 text-center text-[10px] text-muted-foreground"
                      >
                        {date.toLocaleDateString("en-US", { weekday: "narrow" })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Completion Rate */}
      {filteredHabits.length > 0 && (
        <div className="mt-6 rounded-xl bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Today&apos;s Completion Rate
            </span>
            <span className="text-lg font-semibold text-primary">
              {Math.round(
                (filteredHabits.filter((h) =>
                  h.completedDates.includes(new Date().toISOString().split("T")[0])
                ).length /
                  filteredHabits.length) *
                  100
              )}
              %
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${Math.round(
                  (filteredHabits.filter((h) =>
                    h.completedDates.includes(
                      new Date().toISOString().split("T")[0]
                    )
                  ).length /
                    filteredHabits.length) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
