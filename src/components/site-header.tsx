"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Yupsis
                        </span>
                    </Link>
                </div>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserNav />
                </div>
            </div>
        </header>
    )
}
