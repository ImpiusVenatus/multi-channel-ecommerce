'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    Calendar,
    Download,
    Filter
} from 'lucide-react';
import { useState } from 'react';

interface SalesData {
    date: string;
    revenue: number;
    orders: number;
    customers: number;
    products: number;
}

interface TopProduct {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    growth: number;
}

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('revenue');

    // Mock analytics data
    const salesData: SalesData[] = [
        { date: '2024-01-01', revenue: 12500, orders: 45, customers: 38, products: 120 },
        { date: '2024-01-02', revenue: 14200, orders: 52, customers: 45, products: 125 },
        { date: '2024-01-03', revenue: 11800, orders: 41, customers: 35, products: 118 },
        { date: '2024-01-04', revenue: 15600, orders: 58, customers: 49, products: 130 },
        { date: '2024-01-05', revenue: 13200, orders: 48, customers: 42, products: 122 },
        { date: '2024-01-06', revenue: 16800, orders: 62, customers: 54, products: 135 },
        { date: '2024-01-07', revenue: 14500, orders: 53, customers: 47, products: 128 },
    ];

    const topProducts: TopProduct[] = [
        { id: '1', name: 'Premium Cotton T-Shirt', sales: 245, revenue: 7350, growth: 12.5 },
        { id: '2', name: 'Denim Jeans', sales: 189, revenue: 15120, growth: 8.3 },
        { id: '3', name: 'Leather Jacket', sales: 67, revenue: 13399, growth: 15.7 },
        { id: '4', name: 'Running Shoes', sales: 156, revenue: 12480, growth: -2.1 },
        { id: '5', name: 'Hoodie', sales: 134, revenue: 5360, growth: 6.8 },
    ];

    const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0);
    const totalOrders = salesData.reduce((sum, data) => sum + data.orders, 0);
    const totalCustomers = salesData.reduce((sum, data) => sum + data.customers, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    const revenueGrowth = 12.5;
    const ordersGrowth = 8.2;
    const customersGrowth = 15.3;
    const aovGrowth = 4.7;

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600">Monitor your business performance and track key metrics</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                        <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                        <SelectItem value="customers">Customers</SelectItem>
                        <SelectItem value="products">Products</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                                    <span className="text-sm text-green-600">+{revenueGrowth}%</span>
                                </div>
                            </div>
                            <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold">{totalOrders}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                                    <span className="text-sm text-green-600">+{ordersGrowth}%</span>
                                </div>
                            </div>
                            <ShoppingBag className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                <p className="text-2xl font-bold">{totalCustomers}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                                    <span className="text-sm text-green-600">+{customersGrowth}%</span>
                                </div>
                            </div>
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                                <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                                    <span className="text-sm text-green-600">+{aovGrowth}%</span>
                                </div>
                            </div>
                            <Package className="w-8 h-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Sales Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {salesData.map((data, index) => (
                                <div key={data.date} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{new Date(data.date).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600">${data.revenue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{data.orders} orders</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Top Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium truncate">{product.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {product.sales} sales • ${product.revenue.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {product.growth > 0 ? (
                                            <TrendingUp className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.growth > 0 ? '+' : ''}{product.growth}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Metrics */}
            <div className="mt-8">
                <Tabs defaultValue="performance" className="w-full">
                    <TabsList>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    </TabsList>

                    <TabsContent value="performance" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">98.5%</div>
                                        <div className="text-sm text-gray-600">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">2.3s</div>
                                        <div className="text-sm text-gray-600">Avg Load Time</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                                        <div className="text-sm text-gray-600">Customer Rating</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="customers" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Customer Segments</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>New Customers</span>
                                                <span className="font-medium">45%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Returning Customers</span>
                                                <span className="font-medium">35%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>VIP Customers</span>
                                                <span className="font-medium">20%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3">Geographic Distribution</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>North America</span>
                                                <span className="font-medium">60%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Europe</span>
                                                <span className="font-medium">25%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Asia Pacific</span>
                                                <span className="font-medium">15%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="inventory" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">1,245</div>
                                        <div className="text-sm text-gray-600">Total Products</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600">23</div>
                                        <div className="text-sm text-gray-600">Low Stock Items</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">5</div>
                                        <div className="text-sm text-gray-600">Out of Stock</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
