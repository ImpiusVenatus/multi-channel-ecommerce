"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ProductFilters as ProductFiltersType, Product } from "@/lib/types"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, List, Search } from "lucide-react"

// Mock data for demonstration
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Premium Cotton T-Shirt",
        description: "High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
        sku: "TSH-001",
        price: 29.99,
        compareAtPrice: 39.99,
        cost: 15.00,
        weight: 0.2,
        dimensions: { length: 28, width: 20, height: 2 },
        images: [
            {
                id: "img1",
                url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
                alt: "Premium Cotton T-Shirt",
                position: 1,
                isPrimary: true
            }
        ],
        categories: [{ id: "cat1", name: "T-Shirts" }],
        tags: ["cotton", "premium", "casual"],
        variants: [
            {
                id: "var1",
                productId: "1",
                sku: "TSH-001-S",
                name: "Small",
                attributes: { size: "S", color: "White" },
                price: 29.99,
                cost: 15.00,
                weight: 0.2,
                inventory: {
                    id: "inv1",
                    variantId: "var1",
                    locationId: "loc1",
                    available: 50,
                    reserved: 0,
                    incoming: 0,
                    lastUpdated: new Date()
                },
                images: [],
                status: "active"
            },
            {
                id: "var2",
                productId: "1",
                sku: "TSH-001-M",
                name: "Medium",
                attributes: { size: "M", color: "White" },
                price: 29.99,
                cost: 15.00,
                weight: 0.2,
                inventory: {
                    id: "inv2",
                    variantId: "var2",
                    locationId: "loc1",
                    available: 30,
                    reserved: 0,
                    incoming: 0,
                    lastUpdated: new Date()
                },
                images: [],
                status: "active"
            }
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        sourceChannel: "ssactivewear"
    },
    {
        id: "2",
        name: "Denim Jeans",
        description: "Classic denim jeans with a modern fit. Durable and stylish for any occasion.",
        sku: "JNS-001",
        price: 79.99,
        cost: 35.00,
        weight: 0.8,
        dimensions: { length: 32, width: 12, height: 3 },
        images: [
            {
                id: "img2",
                url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
                alt: "Denim Jeans",
                position: 1,
                isPrimary: true
            }
        ],
        categories: [{ id: "cat2", name: "Jeans" }],
        tags: ["denim", "casual", "durable"],
        variants: [
            {
                id: "var3",
                productId: "2",
                sku: "JNS-001-32",
                name: "32x32",
                attributes: { size: "32x32", color: "Blue" },
                price: 79.99,
                cost: 35.00,
                weight: 0.8,
                inventory: {
                    id: "inv3",
                    variantId: "var3",
                    locationId: "loc1",
                    available: 25,
                    reserved: 0,
                    incoming: 0,
                    lastUpdated: new Date()
                },
                images: [],
                status: "active"
            }
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        sourceChannel: "shopify"
    },
    {
        id: "3",
        name: "Leather Jacket",
        description: "Premium leather jacket with a classic design. Perfect for cooler weather.",
        sku: "LTH-001",
        price: 199.99,
        compareAtPrice: 249.99,
        cost: 120.00,
        weight: 1.5,
        dimensions: { length: 30, width: 18, height: 4 },
        images: [
            {
                id: "img3",
                url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
                alt: "Leather Jacket",
                position: 1,
                isPrimary: true
            }
        ],
        categories: [{ id: "cat3", name: "Jackets" }],
        tags: ["leather", "premium", "outerwear"],
        variants: [
            {
                id: "var4",
                productId: "3",
                sku: "LTH-001-L",
                name: "Large",
                attributes: { size: "L", color: "Black" },
                price: 199.99,
                cost: 120.00,
                weight: 1.5,
                inventory: {
                    id: "inv4",
                    variantId: "var4",
                    locationId: "loc1",
                    available: 10,
                    reserved: 0,
                    incoming: 0,
                    lastUpdated: new Date()
                },
                images: [],
                status: "active"
            }
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        sourceChannel: "manual"
    }
]

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
    const [filters, setFilters] = useState<ProductFiltersType>({})
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState<string>("name")

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...products]

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.sku.toLowerCase().includes(searchLower)
            )
        }

        // Apply category filter
        if (filters.category) {
            filtered = filtered.filter(product =>
                product.categories.some(cat => cat.name === filters.category)
            )
        }

        // Apply status filter
        if (filters.status) {
            filtered = filtered.filter(product => product.status === filters.status)
        }

        // Apply channel filter
        if (filters.channel) {
            filtered = filtered.filter(product => product.sourceChannel === filters.channel)
        }

        // Apply price range filter
        if (filters.priceRange) {
            filtered = filtered.filter(product =>
                product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
            )
        }

        // Apply in stock filter
        if (filters.inStock) {
            filtered = filtered.filter(product =>
                product.variants.some(variant => variant.inventory.available > 0)
            )
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name)
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                default:
                    return 0
            }
        })

        setFilteredProducts(filtered)
    }, [products, filters, sortBy])

    const categories = Array.from(new Set(products.flatMap(p => p.categories.map(c => c.name))))

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80">
                        <ProductFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                            categories={categories}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold">Products</h1>
                                <p className="text-muted-foreground">
                                    {filteredProducts.length} of {products.length} products
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort */}
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View Mode */}
                                <div className="flex border rounded-md">
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "space-y-4"
                            }>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your filters or search terms.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
