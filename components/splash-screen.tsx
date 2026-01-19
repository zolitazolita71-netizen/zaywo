"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")

  useEffect(() => {
    // Enter phase complete after 1s
    const enterTimer = setTimeout(() => setPhase("hold"), 1000)
    // Start exit after 4s
    const exitTimer = setTimeout(() => setPhase("exit"), 4000)
    // Complete after 5s
    const completeTimer = setTimeout(() => onComplete(), 5000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000",
        phase === "exit" ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/splash-bg.jpg')" }}
      />

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Logo/Icon */}
        <div
          className={cn(
            "flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm transition-all duration-1000",
            phase === "enter" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <svg
            className="h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Main Text */}
        <div className="space-y-4">
          <h1
            className={cn(
              "text-5xl font-bold tracking-tight text-white md:text-7xl transition-all duration-1000 delay-300",
              phase === "enter"
                ? "translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            <span className="inline-block animate-text-shimmer bg-gradient-to-r from-white via-white/80 to-white bg-[length:200%_100%] bg-clip-text">
              Build Good Habits
            </span>
          </h1>

          <p
            className={cn(
              "text-xl text-white/80 md:text-2xl transition-all duration-1000 delay-500",
              phase === "enter"
                ? "translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            Transform your daily routine
          </p>

          {/* Inspirational quote with special animation */}
          <div
            className={cn(
              "mt-8 transition-all duration-1000 delay-[1500ms]",
              phase === "enter"
                ? "scale-90 opacity-0 blur-md translate-y-6"
                : "scale-100 opacity-100 blur-0 translate-y-0"
            )}
          >
            <p className="text-3xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
              <span className="inline-block animate-text-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent">
                Remember who you wanted to be
              </span>
            </p>
          </div>
        </div>

        {/* Loading indicator */}
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-1000 delay-700",
            phase === "enter"
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-white/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={cn(
            "h-1 w-48 overflow-hidden rounded-full bg-white/20 transition-all duration-1000 delay-700",
            phase === "enter" ? "opacity-0" : "opacity-100"
          )}
        >
          <div
            className="h-full bg-white/80 transition-all duration-[4000ms] ease-linear"
            style={{ width: phase === "enter" ? "0%" : "100%" }}
          />
        </div>
      </div>
    </div>
  )
}
