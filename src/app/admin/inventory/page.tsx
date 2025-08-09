'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface InventoryItem {
    id: string;
    productName: string;
    sku: string;
    variant: string;
    location: string;
    available: number;
    reserved: number;
    incoming: number;
    lastUpdated: Date;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Mock inventory data
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
        {
            id: '1',
            productName: 'Premium Cotton T-Shirt',
            sku: 'TSH-001-S-W',
            variant: 'Small - White',
            location: 'Warehouse A',
            available: 25,
            reserved: 5,
            incoming: 10,
            lastUpdated: new Date(Date.now() - 3600000),
            status: 'in-stock'
        },
        {
            id: '2',
            productName: 'Premium Cotton T-Shirt',
            sku: 'TSH-001-M-W',
            variant: 'Medium - White',
            location: 'Warehouse A',
            available: 30,
            reserved: 8,
            incoming: 15,
            lastUpdated: new Date(Date.now() - 1800000),
            status: 'in-stock'
        },
        {
            id: '3',
            productName: 'Premium Cotton T-Shirt',
            sku: 'TSH-001-L-W',
            variant: 'Large - White',
            location: 'Warehouse B',
            available: 3,
            reserved: 2,
            incoming: 8,
            lastUpdated: new Date(Date.now() - 7200000),
            status: 'low-stock'
        },
        {
            id: '4',
            productName: 'Premium Cotton T-Shirt',
            sku: 'TSH-001-S-B',
            variant: 'Small - Black',
            location: 'Warehouse A',
            available: 0,
            reserved: 0,
            incoming: 12,
            lastUpdated: new Date(Date.now() - 86400000),
            status: 'out-of-stock'
        },
        {
            id: '5',
            productName: 'Denim Jeans',
            sku: 'JNS-001-32-B',
            variant: '32 - Blue',
            location: 'Warehouse B',
            available: 15,
            reserved: 3,
            incoming: 20,
            lastUpdated: new Date(Date.now() - 5400000),
            status: 'in-stock'
        }
    ]);

    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !locationFilter || item.location === locationFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;

        return matchesSearch && matchesLocation && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in-stock':
                return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
            case 'low-stock':
                return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
            case 'out-of-stock':
                return <Badge variant="destructive">Out of Stock</Badge>;
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'in-stock':
                return <TrendingUp className="w-4 h-4 text-green-600" />;
            case 'low-stock':
                return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            case 'out-of-stock':
                return <TrendingDown className="w-4 h-4 text-red-600" />;
            default:
                return <Package className="w-4 h-4 text-gray-600" />;
        }
    };

    const totalItems = inventoryItems.length;
    const inStockItems = inventoryItems.filter(item => item.status === 'in-stock').length;
    const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length;
    const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length;
    const totalAvailable = inventoryItems.reduce((sum, item) => sum + item.available, 0);
    const totalReserved = inventoryItems.reduce((sum, item) => sum + item.reserved, 0);
    const totalIncoming = inventoryItems.reduce((sum, item) => sum + item.incoming, 0);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
                <p className="text-gray-600">Monitor and manage your product inventory across all locations</p>
            </div>

            {/* Inventory Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Products</p>
                                <p className="text-2xl font-bold">{totalItems}</p>
                            </div>
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Available Stock</p>
                                <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Reserved</p>
                                <p className="text-2xl font-bold text-orange-600">{totalReserved}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Incoming</p>
                                <p className="text-2xl font-bold text-blue-600">{totalIncoming}</p>
                            </div>
                            <TrendingDown className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            In Stock
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600 mb-2">{inStockItems}</div>
                        <p className="text-sm text-gray-600">Products with sufficient stock</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            Low Stock
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-600 mb-2">{lowStockItems}</div>
                        <p className="text-sm text-gray-600">Products running low</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-red-600" />
                            Out of Stock
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600 mb-2">{outOfStockItems}</div>
                        <p className="text-sm text-gray-600">Products with no stock</p>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Inventory Items</CardTitle>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search products or SKU..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Locations</SelectItem>
                                <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                                <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Status</SelectItem>
                                <SelectItem value="in-stock">In Stock</SelectItem>
                                <SelectItem value="low-stock">Low Stock</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Variant</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Reserved</TableHead>
                                    <TableHead>Incoming</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.productName}</TableCell>
                                        <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                                        <TableCell>{item.variant}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell className="font-semibold">{item.available}</TableCell>
                                        <TableCell className="text-orange-600">{item.reserved}</TableCell>
                                        <TableCell className="text-blue-600">{item.incoming}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(item.status)}
                                                {getStatusBadge(item.status)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {item.lastUpdated.toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-8">
                            <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-600">No inventory items found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
