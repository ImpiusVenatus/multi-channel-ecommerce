'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/stores/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductVariant } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [imageError, setImageError] = useState(false);

    // Get the primary image or first available image
    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

    // Get the default variant (first available variant)
    const defaultVariant = product.variants[0];
    const currentVariant = selectedVariant || defaultVariant;

    // Check if product is in stock
    const isInStock = product.variants.some(variant => variant.inventory.available > 0);

    // Calculate discount percentage if there's a compare price
    const discountPercentage = product.compareAtPrice && product.compareAtPrice > product.price
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentVariant && isInStock) {
            addItem(product, currentVariant, 1);
        }
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleVariantSelect = (e: React.MouseEvent, variant: ProductVariant) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedVariant(variant);
    };

    // Fallback image URL for products without images
    const imageUrl = imageError || !primaryImage?.url
        ? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
        : primaryImage.url;

    return (
        <Link href={`/storefront/product/${product.id}`} className="block">
            <Card
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Product Image */}
                <CardHeader className="p-0 relative">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <Image
                            src={imageUrl}
                            alt={primaryImage?.alt || product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => setImageError(true)}
                            priority={false}
                        />

                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute top-2 left-2 z-10"
                            >
                                {discountPercentage}% OFF
                            </Badge>
                        )}

                        {/* Stock Status Badge */}
                        {!isInStock && (
                            <Badge
                                variant="secondary"
                                className="absolute top-2 right-2 z-10 bg-red-100 text-red-800"
                            >
                                Out of Stock
                            </Badge>
                        )}

                        {/* Quick Actions Overlay */}
                        <div className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 flex items-center justify-center gap-2 ${isHovered ? 'bg-opacity-20' : ''
                            }`}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className={`opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''
                                    }`}
                                onClick={handleWishlistToggle}
                            >
                                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>

                            <Button
                                size="sm"
                                variant="secondary"
                                className={`opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''
                                    }`}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {/* Product Content */}
                <CardContent className="p-4">
                    {/* Categories */}
                    <div className="flex items-center gap-1 mb-2">
                        {product.categories.slice(0, 2).map((category) => (
                            <Badge key={category.id} variant="outline" className="text-xs">
                                {category.name}
                            </Badge>
                        ))}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">(24)</span>
                    </div>

                    {/* Variant Selection (if multiple variants) */}
                    {product.variants.length > 1 && (
                        <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                                {product.variants.slice(0, 3).map((variant) => (
                                    <Button
                                        key={variant.id}
                                        size="sm"
                                        variant={currentVariant?.id === variant.id ? "default" : "outline"}
                                        className="text-xs h-6 px-2"
                                        onClick={(e) => handleVariantSelect(e, variant)}
                                        disabled={variant.inventory.available === 0}
                                    >
                                        {Object.values(variant.attributes).join(' - ')}
                                    </Button>
                                ))}
                                {product.variants.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{product.variants.length - 3} more
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pricing */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-green-600">
                            ${currentVariant?.price.toFixed(2) || product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                ${product.compareAtPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                        className="w-full"
                        size="sm"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isInStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>

                    {/* Product Tags */}
                    {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {product.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                            {product.tags.length > 2 && (
                                <span className="text-xs text-gray-500">
                                    +{product.tags.length - 2} more
                                </span>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
