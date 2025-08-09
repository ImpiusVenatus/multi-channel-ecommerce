'use client';

import { useCartStore } from '@/lib/stores/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CheckoutPage() {
    const { items, getSubtotal, getTotalItems, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        saveInfo: false,
        marketing: false
    });

    const [paymentMethod, setPaymentMethod] = useState('card');

    if (items.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
                    <Link href="/storefront/products">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </main>
        );
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle order submission here
        console.log('Order submitted:', { formData, items });
        // Clear cart after successful order
        clearCart();
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link href="/storefront/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="address1">Address Line 1 *</Label>
                                    <Input
                                        id="address1"
                                        value={formData.address1}
                                        onChange={(e) => handleInputChange('address1', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address2">Address Line 2</Label>
                                    <Input
                                        id="address2"
                                        value={formData.address2}
                                        onChange={(e) => handleInputChange('address2', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State *</Label>
                                        <Input
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="zip">ZIP Code *</Label>
                                        <Input
                                            id="zip"
                                            value={formData.zip}
                                            onChange={(e) => handleInputChange('zip', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="US">United States</SelectItem>
                                            <SelectItem value="CA">Canada</SelectItem>
                                            <SelectItem value="UK">United Kingdom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="card"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <Label htmlFor="card">Credit Card</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="paypal"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <Label htmlFor="paypal">PayPal</Label>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input id="expiry" placeholder="MM/YY" />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input id="cvv" placeholder="123" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Additional Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="saveInfo"
                                        checked={formData.saveInfo}
                                        onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                                    />
                                    <Label htmlFor="saveInfo">Save this information for next time</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={formData.marketing}
                                        onCheckedChange={(checked) => handleInputChange('marketing', checked as boolean)}
                                    />
                                    <Label htmlFor="marketing">Subscribe to our newsletter for updates and offers</Label>
                                </div>
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
                                {/* Order Items */}
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                <Image
                                                    src={item.product.images[0]?.url || '/placeholder-product.jpg'}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                                                <p className="text-xs text-gray-600">
                                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-2">
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

                                <Button type="submit" className="w-full" size="lg">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Place Order
                                </Button>

                                <p className="text-xs text-gray-600 text-center">
                                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </main>
    );
}
