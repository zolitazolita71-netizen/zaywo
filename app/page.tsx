"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { TodayFocus } from "@/components/dashboard/today-focus"
import { HabitTracker } from "@/components/dashboard/habit-tracker"
import { TodoList } from "@/components/dashboard/todo-list"
import { Analytics } from "@/components/dashboard/analytics"
import { Footer } from "@/components/dashboard/footer"
import { SplashScreen } from "@/components/splash-screen"

export default function Dashboard() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Today's Focus */}
          <div className="lg:col-span-1">
            <TodayFocus />
          </div>

          {/* Right Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <HabitTracker />
            <div className="grid gap-6 xl:grid-cols-2">
              <TodoList />
              <Analytics />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
