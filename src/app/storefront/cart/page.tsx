'use client';

import { useCartStore } from '@/lib/stores/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, getTotalItems, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-6">
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    </div>
                    <Link href="/storefront/products">
                        <Button className="w-full sm:w-auto">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
                        Clear Cart
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Cart Items ({getTotalItems()})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]?.url || '/placeholder-product.jpg'}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">{item.product.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {Object.entries(item.variant.attributes).map(([key, value]) => (
                                                    <span key={key} className="mr-2">
                                                        {key}: {value}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className="text-lg font-semibold text-green-600">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                className="w-16 text-center"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({getTotalItems()} items)</span>
                                        <span>${getSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>${getSubtotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/storefront/checkout" className="w-full">
                                    <Button className="w-full" size="lg">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>

                                <Link href="/storefront/products" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
