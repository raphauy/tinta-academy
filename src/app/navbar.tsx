
import LoginComponent from "@/app/auth/login/LoginComponent"
import { ThemeToggle } from "@/components/chadcn/theme-toggle"
import Link from "next/link"
import LogoTinta from "../components/logoTinta"
import getSession from "@/services/session"
import Menu from "./menu"

export function Navbar() {

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center">        
        <LogoTinta />
        <ThemeToggle />
        <div className="flex-1">
          {/* @ts-expect-error Server Component */}
          <Menu />
        </div>
        {/* @ts-expect-error Server Component */}
        <LoginComponent />
      </div>
    </header>
  )
}
