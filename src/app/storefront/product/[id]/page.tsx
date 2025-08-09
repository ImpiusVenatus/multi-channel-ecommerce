'use client';

import { useCartStore } from '@/lib/stores/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';

// Mock product data - in a real app, this would come from an API
const mockProduct: Product = {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear, this t-shirt features a classic design that goes with everything. Made from 100% organic cotton for breathability and comfort.',
    sku: 'TSH-001',
    price: 29.99,
    compareAtPrice: 39.99,
    cost: 15.00,
    weight: 0.2,
    dimensions: { length: 28, width: 20, height: 2 },
    images: [
        { id: '1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', alt: 'T-Shirt Front', position: 1, isPrimary: true },
        { id: '2', url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop', alt: 'T-Shirt Back', position: 2, isPrimary: false },
        { id: '3', url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop', alt: 'T-Shirt Detail', position: 3, isPrimary: false },
    ],
    categories: [
        { id: '1', name: 'Clothing', description: 'Apparel and accessories' },
        { id: '2', name: 'T-Shirts', description: 'Casual t-shirts' }
    ],
    tags: ['cotton', 'organic', 'casual', 'comfortable'],
    variants: [
        {
            id: '1',
            productId: '1',
            sku: 'TSH-001-S-M',
            name: 'Small - White',
            attributes: { size: 'S', color: 'White' },
            price: 29.99,
            compareAtPrice: 39.99,
            cost: 15.00,
            weight: 0.2,
            inventory: {
                id: '1',
                variantId: '1',
                locationId: '1',
                available: 25,
                reserved: 0,
                incoming: 10,
                lastUpdated: new Date()
            },
            images: [],
            status: 'active'
        },
        {
            id: '2',
            productId: '1',
            sku: 'TSH-001-M-W',
            name: 'Medium - White',
            attributes: { size: 'M', color: 'White' },
            price: 29.99,
            compareAtPrice: 39.99,
            cost: 15.00,
            weight: 0.2,
            inventory: {
                id: '2',
                variantId: '2',
                locationId: '1',
                available: 30,
                reserved: 0,
                incoming: 15,
                lastUpdated: new Date()
            },
            images: [],
            status: 'active'
        },
        {
            id: '3',
            productId: '1',
            sku: 'TSH-001-L-W',
            name: 'Large - White',
            attributes: { size: 'L', color: 'White' },
            price: 29.99,
            compareAtPrice: 39.99,
            cost: 15.00,
            weight: 0.2,
            inventory: {
                id: '3',
                variantId: '3',
                locationId: '1',
                available: 20,
                reserved: 0,
                incoming: 8,
                lastUpdated: new Date()
            },
            images: [],
            status: 'active'
        },
        {
            id: '4',
            productId: '1',
            sku: 'TSH-001-S-B',
            name: 'Small - Black',
            attributes: { size: 'S', color: 'Black' },
            price: 29.99,
            compareAtPrice: 39.99,
            cost: 15.00,
            weight: 0.2,
            inventory: {
                id: '4',
                variantId: '4',
                locationId: '1',
                available: 18,
                reserved: 0,
                incoming: 12,
                lastUpdated: new Date()
            },
            images: [],
            status: 'active'
        }
    ],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    sourceChannel: 'manual'
};

export default function SingleProductPage({ params }: { params: { id: string } }) {
    const { addItem } = useCartStore();
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(mockProduct.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = () => {
        addItem(mockProduct, selectedVariant, quantity);
    };

    const handleVariantSelect = (variant: ProductVariant) => {
        setSelectedVariant(variant);
    };

    const isInStock = selectedVariant.inventory.available > 0;

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/storefront/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={imageError || !mockProduct.images[selectedImage]?.url
                                ? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
                                : mockProduct.images[selectedImage].url}
                            alt={mockProduct.images[selectedImage]?.alt || mockProduct.name}
                            fill
                            className="object-cover"
                            onError={() => setImageError(true)}
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-2">
                        {mockProduct.images.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
                                    }`}
                            >
                                <Image
                                    src={image.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop';
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    {/* Product Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {mockProduct.categories.map(category => (
                                <Badge key={category.id} variant="secondary">
                                    {category.name}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                            </div>
                            <span className="text-sm text-gray-600">SKU: {mockProduct.sku}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-green-600">
                                ${selectedVariant.price.toFixed(2)}
                            </span>
                            {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${selectedVariant.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                            {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
                                <Badge variant="destructive">
                                    {Math.round(((selectedVariant.compareAtPrice - selectedVariant.price) / selectedVariant.compareAtPrice) * 100)}% OFF
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Variant Selection */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Size</h3>
                            <div className="flex gap-2">
                                {Array.from(new Set(mockProduct.variants.map(v => v.attributes.size))).map(size => (
                                    <Button
                                        key={size}
                                        variant={selectedVariant.attributes.size === size ? "default" : "outline"}
                                        onClick={() => {
                                            const variant = mockProduct.variants.find(v =>
                                                v.attributes.size === size &&
                                                v.attributes.color === selectedVariant.attributes.color
                                            );
                                            if (variant) handleVariantSelect(variant);
                                        }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Color</h3>
                            <div className="flex gap-2">
                                {Array.from(new Set(mockProduct.variants.map(v => v.attributes.color))).map(color => (
                                    <Button
                                        key={color}
                                        variant={selectedVariant.attributes.color === color ? "default" : "outline"}
                                        onClick={() => {
                                            const variant = mockProduct.variants.find(v =>
                                                v.attributes.color === color &&
                                                v.attributes.size === selectedVariant.attributes.size
                                            );
                                            if (variant) handleVariantSelect(variant);
                                        }}
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {isInStock ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                    In Stock ({selectedVariant.inventory.available} available)
                                </Badge>
                            ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={!isInStock || quantity >= selectedVariant.inventory.available}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={handleAddToCart}
                                disabled={!isInStock}
                                className="flex-1"
                                size="lg"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="lg">
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Product Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                        <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RotateCcw className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-16">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-gray-700 leading-relaxed">{mockProduct.description}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Product Details</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Material:</span>
                                                <span>100% Organic Cotton</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Weight:</span>
                                                <span>{mockProduct.weight} kg</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Dimensions:</span>
                                                <span>{mockProduct.dimensions.length} × {mockProduct.dimensions.width} × {mockProduct.dimensions.height} cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Care Instructions</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Machine wash cold</li>
                                            <li>• Tumble dry low</li>
                                            <li>• Do not bleach</li>
                                            <li>• Iron on low if needed</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center py-8">
                                    <Star className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
