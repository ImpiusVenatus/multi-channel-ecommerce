"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ProductFilters as ProductFiltersType, ProductStatus, ChannelType } from "@/lib/types"
import { Search, Filter, X } from "lucide-react"

interface ProductFiltersProps {
    filters: ProductFiltersType
    onFiltersChange: (filters: ProductFiltersType) => void
    categories?: string[]
    className?: string
}

export function ProductFilters({
    filters,
    onFiltersChange,
    categories = [],
    className
}: ProductFiltersProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleFilterChange = (key: keyof ProductFiltersType, value: any) => {
        // Handle "all" values by removing the filter
        const newValue = value === 'all' ? undefined : value
        onFiltersChange({
            ...filters,
            [key]: newValue
        })
    }

    const clearFilters = () => {
        onFiltersChange({})
    }

    const hasActiveFilters = Object.keys(filters).length > 0

    return (
        <div className={className}>
            {/* Mobile filter toggle */}
            <div className="flex items-center gap-2 md:hidden">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                </Button>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Desktop filters */}
            <Card className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Filters</span>
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                Clear all
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Search */}
                    <div className="space-y-2">
                        <Label htmlFor="search">Search</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search products..."
                                value={filters.search || ''}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    {categories.length > 0 && (
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={filters.category || 'all'}
                                onValueChange={(value) => handleFilterChange('category', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Status */}
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={(value) => handleFilterChange('status', value as ProductStatus)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Channel */}
                    <div className="space-y-2">
                        <Label>Source Channel</Label>
                        <Select
                            value={filters.channel || 'all'}
                            onValueChange={(value) => handleFilterChange('channel', value as ChannelType)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All channels" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All channels</SelectItem>
                                <SelectItem value="ssactivewear">SSActiveWear</SelectItem>
                                <SelectItem value="shopify">Shopify</SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <Label>Price Range</Label>
                        <div className="space-y-4">
                            <Slider
                                value={[
                                    filters.priceRange?.min || 0,
                                    filters.priceRange?.max || 1000
                                ]}
                                onValueChange={([min, max]) =>
                                    handleFilterChange('priceRange', { min, max })
                                }
                                max={1000}
                                min={0}
                                step={10}
                                className="w-full"
                            />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>${filters.priceRange?.min || 0}</span>
                                <span>-</span>
                                <span>${filters.priceRange?.max || 1000}</span>
                            </div>
                        </div>
                    </div>

                    {/* In Stock Only */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="inStock"
                            checked={filters.inStock || false}
                            onCheckedChange={(checked: boolean | 'indeterminate') =>
                                handleFilterChange('inStock', checked === true)
                            }
                        />
                        <Label htmlFor="inStock" className="text-sm">
                            In stock only
                        </Label>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
