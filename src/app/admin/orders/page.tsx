'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    ShoppingBag, 
    Search, 
    Filter, 
    Download, 
    Eye, 
    Package, 
    Truck, 
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

interface Order {
    id: string;
    orderNumber: string;
    customer: {
        name: string;
        email: string;
    };
    date: Date;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
    paymentStatus: 'paid' | 'pending' | 'failed';
    shippingMethod: string;
    channel: string;
}

export default function AdminOrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    // Mock orders data
    const orders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-2024-001',
            customer: { name: 'John Doe', email: 'john.doe@example.com' },
            date: new Date('2024-01-15'),
            status: 'delivered',
            total: 129.99,
            items: 3,
            paymentStatus: 'paid',
            shippingMethod: 'Standard Shipping',
            channel: 'Website'
        },
        {
            id: '2',
            orderNumber: 'ORD-2024-002',
            customer: { name: 'Jane Smith', email: 'jane.smith@example.com' },
            date: new Date('2024-01-20'),
            status: 'shipped',
            total: 79.99,
            items: 1,
            paymentStatus: 'paid',
            shippingMethod: 'Express Shipping',
            channel: 'Mobile App'
        },
        {
            id: '3',
            orderNumber: 'ORD-2024-003',
            customer: { name: 'Mike Johnson', email: 'mike.johnson@example.com' },
            date: new Date('2024-01-25'),
            status: 'processing',
            total: 199.99,
            items: 2,
            paymentStatus: 'paid',
            shippingMethod: 'Standard Shipping',
            channel: 'Website'
        },
        {
            id: '4',
            orderNumber: 'ORD-2024-004',
            customer: { name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
            date: new Date('2024-01-26'),
            status: 'pending',
            total: 89.99,
            items: 1,
            paymentStatus: 'pending',
            shippingMethod: 'Standard Shipping',
            channel: 'Website'
        },
        {
            id: '5',
            orderNumber: 'ORD-2024-005',
            customer: { name: 'David Brown', email: 'david.brown@example.com' },
            date: new Date('2024-01-27'),
            status: 'confirmed',
            total: 159.99,
            items: 4,
            paymentStatus: 'paid',
            shippingMethod: 'Express Shipping',
            channel: 'Mobile App'
        },
        {
            id: '6',
            orderNumber: 'ORD-2024-006',
            customer: { name: 'Lisa Davis', email: 'lisa.davis@example.com' },
            date: new Date('2024-01-28'),
            status: 'cancelled',
            total: 69.99,
            items: 1,
            paymentStatus: 'failed',
            shippingMethod: 'Standard Shipping',
            channel: 'Website'
        }
    ];

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-purple-100 text-purple-800';
            case 'pending': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'processing': return <Package className="w-4 h-4" />;
            case 'confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getPaymentStatusColor = (status: Order['paymentStatus']) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
        
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const getStatusCount = (status: Order['status']) => {
        return orders.filter(order => order.status === status).length;
    };

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
                <p className="text-gray-600">Manage and track all customer orders</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold">{totalOrders}</p>
                            </div>
                            <ShoppingBag className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                            </div>
                            <Package className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                <p className="text-2xl font-bold">{getStatusCount('pending')}</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Processing</p>
                                <p className="text-2xl font-bold">{getStatusCount('processing')}</p>
                            </div>
                            <Truck className="w-8 h-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search orders, customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payments</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.orderNumber}</p>
                                            <p className="text-sm text-gray-600">{order.items} items</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.customer.name}</p>
                                            <p className="text-sm text-gray-600">{order.customer.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {order.date.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(order.status)}>
                                            <div className="flex items-center gap-1">
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium">${order.total.toFixed(2)}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{order.channel}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Status Overview */}
            <div className="mt-8">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Status Overview</TabsTrigger>
                        <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Pending</span>
                                            <Badge variant="outline">{getStatusCount('pending')}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Confirmed</span>
                                            <Badge variant="outline">{getStatusCount('confirmed')}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Processing</span>
                                            <Badge variant="outline">{getStatusCount('processing')}</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Shipped</span>
                                            <Badge variant="outline">{getStatusCount('shipped')}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Delivered</span>
                                            <Badge variant="outline">{getStatusCount('delivered')}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Cancelled</span>
                                            <Badge variant="outline">{getStatusCount('cancelled')}</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Total Orders</span>
                                            <Badge variant="default">{totalOrders}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Total Revenue</span>
                                            <Badge variant="default">${totalRevenue.toLocaleString()}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Avg Order Value</span>
                                            <Badge variant="default">${(totalRevenue / totalOrders).toFixed(2)}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="recent" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orders.slice(0, 5).map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{order.orderNumber}</p>
                                                    <p className="text-sm text-gray-600">{order.customer.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${order.total.toFixed(2)}</p>
                                                <Badge className={getStatusColor(order.status)}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
