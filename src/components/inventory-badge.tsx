"use client"

import { Badge } from "@/components/ui/badge"
import { ProductVariant } from "@/lib/types"
import { cn } from "@/lib/utils"

interface InventoryBadgeProps {
    variant?: ProductVariant | null
    className?: string
}

export function InventoryBadge({ variant, className }: InventoryBadgeProps) {
    if (!variant) {
        return (
            <Badge variant="secondary" className={cn("text-xs", className)}>
                No variants
            </Badge>
        )
    }

    const available = variant.inventory?.available || 0
    const reserved = variant.inventory?.reserved || 0
    const total = available + reserved

    if (total === 0) {
        return (
            <Badge variant="destructive" className={cn("text-xs", className)}>
                Out of Stock
            </Badge>
        )
    }

    if (available === 0) {
        return (
            <Badge variant="secondary" className={cn("text-xs", className)}>
                Reserved
            </Badge>
        )
    }

    if (available <= 5) {
        return (
            <Badge variant="outline" className={cn("text-xs text-orange-600 border-orange-600", className)}>
                Low Stock ({available})
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className={cn("text-xs text-green-600 border-green-600", className)}>
            In Stock ({available})
        </Badge>
    )
}
