'use client';

import { useCartStore } from '@/lib/stores/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Cart() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={closeCart}
            />

            {/* Cart Panel */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Shopping Cart</h2>
                            <span className="text-sm text-gray-500">({getTotalItems()} items)</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={closeCart}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="text-center py-8">
                                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                                <p className="text-gray-600 mb-4">Add some products to get started!</p>
                                <Button onClick={closeCart}>
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <Card key={item.id} className="p-3">
                                        <CardContent className="p-0">
                                            <div className="flex gap-3">
                                                <div className="relative w-16 h-16 flex-shrink-0">
                                                    <Image
                                                        src={item.product.images[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop';
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                                                    <p className="text-xs text-gray-600">
                                                        {Object.entries(item.variant.attributes).map(([key, value]) => (
                                                            <span key={key} className="mr-2">
                                                                {key}: {value}
                                                            </span>
                                                        ))}
                                                    </p>
                                                    <p className="text-sm font-semibold text-green-600">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-600 hover:text-red-700 p-1 h-auto"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>

                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 h-8 text-center text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t p-4 space-y-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>${getSubtotal().toFixed(2)}</span>
                            </div>

                            <div className="space-y-2">
                                <Link href="/storefront/cart" className="w-full">
                                    <Button className="w-full" onClick={closeCart}>
                                        View Cart
                                    </Button>
                                </Link>

                                <Link href="/storefront/checkout" className="w-full">
                                    <Button variant="outline" className="w-full" onClick={closeCart}>
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
