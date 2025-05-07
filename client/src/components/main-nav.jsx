"use client"

import Link from "next/link"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function MainNav() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/dashboard" className="font-semibold">
        ClientNest
      </Link>
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
