"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Package, BarChart3, Settings, Home } from "lucide-react"
import { useCartStore } from "@/lib/stores/cart"

const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/storefront/products", icon: Package },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
]

export function MainNav() {
    const pathname = usePathname()
    const { getTotalItems, openCart } = useCartStore()

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => {
                const Icon = item.icon
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === item.href
                                ? "text-black dark:text-white"
                                : "text-muted-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        <span className="hidden md:inline-block">{item.name}</span>
                    </Link>
                )
            })}

            <Button
                variant="outline"
                size="sm"
                onClick={openCart}
                className="relative"
            >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden md:ml-2 md:inline-block">Cart</span>
                {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {getTotalItems()}
                    </span>
                )}
            </Button>
        </nav>
    )
}

