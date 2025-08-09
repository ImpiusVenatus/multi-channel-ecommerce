'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShoppingBag,
    Heart,
    Star,
    Edit,
    Camera,
    Save,
    X
} from 'lucide-react';
import { useState } from 'react';

interface Order {
    id: string;
    orderNumber: string;
    date: Date;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
}

interface Review {
    id: string;
    productName: string;
    rating: number;
    comment: string;
    date: Date;
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'E-commerce enthusiast and business owner. Love exploring new products and sharing experiences.',
        address: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
        },
        dateOfBirth: '1990-05-15',
        avatar: '/avatars/01.png'
    });

    // Mock data
    const orders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-2024-001',
            date: new Date('2024-01-15'),
            status: 'delivered',
            total: 129.99,
            items: 3
        },
        {
            id: '2',
            orderNumber: 'ORD-2024-002',
            date: new Date('2024-01-20'),
            status: 'shipped',
            total: 79.99,
            items: 1
        },
        {
            id: '3',
            orderNumber: 'ORD-2024-003',
            date: new Date('2024-01-25'),
            status: 'processing',
            total: 199.99,
            items: 2
        }
    ];

    const reviews: Review[] = [
        {
            id: '1',
            productName: 'Premium Cotton T-Shirt',
            rating: 5,
            comment: 'Excellent quality! The fabric is so soft and comfortable. Highly recommend!',
            date: new Date('2024-01-10')
        },
        {
            id: '2',
            productName: 'Denim Jeans',
            rating: 4,
            comment: 'Great fit and quality. The color is exactly as shown in the pictures.',
            date: new Date('2024-01-05')
        }
    ];

    const handleSave = () => {
        setIsEditing(false);
        // In a real app, you would save the data to the backend
        console.log('Profile data saved:', profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'pending': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <p className="text-gray-600">Manage your account information and preferences</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader className="text-center">
                                    <div className="relative inline-block">
                                        <Avatar className="h-24 w-24 mx-auto mb-4">
                                            <AvatarImage src={profileData.avatar} alt="Profile" />
                                            <AvatarFallback className="text-lg">
                                                {profileData.firstName[0]}{profileData.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        {isEditing && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                            >
                                                <Camera className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <CardTitle className="text-xl">
                                        {profileData.firstName} {profileData.lastName}
                                    </CardTitle>
                                    <p className="text-gray-600">{profileData.email}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Member since {new Date('2023-01-01').toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {orders.length} orders placed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {reviews.length} reviews written
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Profile Details */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Personal Information</CardTitle>
                                        {!isEditing ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleCancel}
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={handleSave}
                                                >
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Basic Information */}
                                        <div>
                                            <h4 className="font-semibold mb-4">Basic Information</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input
                                                        id="firstName"
                                                        value={profileData.firstName}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input
                                                        id="lastName"
                                                        value={profileData.lastName}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={profileData.phone}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                                    <Input
                                                        id="dateOfBirth"
                                                        type="date"
                                                        value={profileData.dateOfBirth}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Address */}
                                        <div>
                                            <h4 className="font-semibold mb-4">Address</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="street">Street Address</Label>
                                                    <Input
                                                        id="street"
                                                        value={profileData.address.street}
                                                        onChange={(e) => setProfileData(prev => ({
                                                            ...prev,
                                                            address: { ...prev.address, street: e.target.value }
                                                        }))}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <Label htmlFor="city">City</Label>
                                                        <Input
                                                            id="city"
                                                            value={profileData.address.city}
                                                            onChange={(e) => setProfileData(prev => ({
                                                                ...prev,
                                                                address: { ...prev.address, city: e.target.value }
                                                            }))}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="state">State</Label>
                                                        <Input
                                                            id="state"
                                                            value={profileData.address.state}
                                                            onChange={(e) => setProfileData(prev => ({
                                                                ...prev,
                                                                address: { ...prev.address, state: e.target.value }
                                                            }))}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="zip">ZIP Code</Label>
                                                        <Input
                                                            id="zip"
                                                            value={profileData.address.zip}
                                                            onChange={(e) => setProfileData(prev => ({
                                                                ...prev,
                                                                address: { ...prev.address, zip: e.target.value }
                                                            }))}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Bio */}
                                        <div>
                                            <h4 className="font-semibold mb-4">About Me</h4>
                                            <div>
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    value={profileData.bio}
                                                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                                                    disabled={!isEditing}
                                                    rows={4}
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.orderNumber}</span>
                                                <span className="text-sm text-gray-600">
                                                    {order.date.toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-600">
                                                    {order.items} item{order.items > 1 ? 's' : ''}
                                                </span>
                                                <span className="font-medium">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={getStatusColor(order.status)}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="p-4 border rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium">{review.productName}</h4>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-2">{review.comment}</p>
                                        <span className="text-sm text-gray-500">
                                            {review.date.toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Wishlist Tab */}
                <TabsContent value="wishlist" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Wishlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <Heart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-600">Your wishlist is empty</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Start adding products you love to your wishlist
                                </p>
                                <Button>
                                    Browse Products
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}
