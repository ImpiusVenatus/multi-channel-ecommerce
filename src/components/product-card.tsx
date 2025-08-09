"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product, ProductVariant } from "@/lib/types"
import { useCartStore } from "@/lib/stores/cart"
import { ShoppingCart, Eye } from "lucide-react"
import { InventoryBadge } from "./inventory-badge"
import { VariantSelector } from "./variant-selector"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
        product.variants[0] || null
    )
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useCartStore()

    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
    const isInStock = selectedVariant?.inventory.available && selectedVariant.inventory.available > 0

    const handleAddToCart = () => {
        if (selectedVariant) {
            addItem(product, selectedVariant, quantity)
        }
    }

    const handleVariantChange = (variant: ProductVariant) => {
        setSelectedVariant(variant)
        setQuantity(1)
    }

    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden">
                    {primaryImage ? (
                        <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt || product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-muted-foreground">No image</span>
                        </div>
                    )}

                    {/* Status badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.status === 'active' && (
                            <Badge variant="default" className="text-xs">
                                Active
                            </Badge>
                        )}
                        {product.sourceChannel && (
                            <Badge variant="secondary" className="text-xs">
                                {product.sourceChannel}
                            </Badge>
                        )}
                    </div>

                    {/* Quick view button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <Link href={`/products/${product.id}`}>
                            <Button variant="secondary" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                Quick View
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="space-y-2">
                    <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">
                                    ${selectedVariant?.price || product.price}
                                </span>
                                {selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
                                    <span className="text-sm text-muted-foreground line-through">
                                        ${selectedVariant.compareAtPrice}
                                    </span>
                                )}
                            </div>
                            <InventoryBadge variant={selectedVariant} />
                        </div>
                    </div>

                    {/* Variant selector */}
                    {product.variants.length > 1 && (
                        <VariantSelector
                            variants={product.variants}
                            selectedVariant={selectedVariant}
                            onVariantChange={handleVariantChange}
                        />
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="w-full"
                    size="sm"
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    )
}
