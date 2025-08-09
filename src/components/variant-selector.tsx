"use client"

import { ProductVariant } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VariantSelectorProps {
    variants: ProductVariant[]
    selectedVariant: ProductVariant | null
    onVariantChange: (variant: ProductVariant) => void
    className?: string
}

export function VariantSelector({
    variants,
    selectedVariant,
    onVariantChange,
    className
}: VariantSelectorProps) {
    // Group variants by attributes (e.g., size, color)
    const attributeGroups = variants.reduce((groups, variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
            if (!groups[key]) {
                groups[key] = new Set()
            }
            groups[key].add(value)
        })
        return groups
    }, {} as Record<string, Set<string>>)

    const getAvailableVariants = (attributeKey: string, attributeValue: string) => {
        return variants.filter(variant =>
            variant.attributes[attributeKey] === attributeValue &&
            variant.inventory.available > 0
        )
    }

    const isVariantAvailable = (variant: ProductVariant) => {
        return variant.inventory.available > 0
    }

    return (
        <div className={cn("space-y-3", className)}>
            {Object.entries(attributeGroups).map(([attributeKey, values]) => (
                <div key={attributeKey} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                        {attributeKey}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(values).map((value) => {
                            const availableVariants = getAvailableVariants(attributeKey, value)
                            const isAvailable = availableVariants.length > 0
                            const isSelected = selectedVariant?.attributes[attributeKey] === value

                            return (
                                <Button
                                    key={value}
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    disabled={!isAvailable}
                                    onClick={() => {
                                        if (isAvailable) {
                                            onVariantChange(availableVariants[0])
                                        }
                                    }}
                                    className={cn(
                                        "min-w-[40px] h-8 text-xs",
                                        !isAvailable && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {value}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
