'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Filter, Download, AlertCircle, CheckCircle, Info, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface LogEntry {
    id: string;
    timestamp: Date;
    level: 'info' | 'warning' | 'error' | 'success';
    category: 'system' | 'import' | 'inventory' | 'order' | 'user';
    message: string;
    details?: string;
    userId?: string;
    source?: string;
}

export default function LogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');

    // Mock log data
    const [logs, setLogs] = useState<LogEntry[]>([
        {
            id: '1',
            timestamp: new Date(Date.now() - 300000),
            level: 'success',
            category: 'import',
            message: 'Product import completed successfully',
            details: '150 products imported from SSActiveWear',
            userId: 'admin-1',
            source: 'SSActiveWear API'
        },
        {
            id: '2',
            timestamp: new Date(Date.now() - 600000),
            level: 'warning',
            category: 'inventory',
            message: 'Low stock alert triggered',
            details: 'Product TSH-001-L-W has only 3 units remaining',
            userId: 'system',
            source: 'Inventory Monitor'
        },
        {
            id: '3',
            timestamp: new Date(Date.now() - 900000),
            level: 'error',
            category: 'system',
            message: 'Database connection failed',
            details: 'Connection timeout after 30 seconds',
            userId: 'system',
            source: 'Database Service'
        },
        {
            id: '4',
            timestamp: new Date(Date.now() - 1200000),
            level: 'info',
            category: 'user',
            message: 'User login successful',
            details: 'User admin@example.com logged in from 192.168.1.100',
            userId: 'admin-1',
            source: 'Authentication Service'
        },
        {
            id: '5',
            timestamp: new Date(Date.now() - 1500000),
            level: 'success',
            category: 'order',
            message: 'Order #12345 processed successfully',
            details: 'Payment confirmed and inventory updated',
            userId: 'system',
            source: 'Order Processing'
        },
        {
            id: '6',
            timestamp: new Date(Date.now() - 1800000),
            level: 'error',
            category: 'import',
            message: 'Import job failed',
            details: 'Invalid CSV format in uploaded file',
            userId: 'admin-1',
            source: 'Manual Upload'
        },
        {
            id: '7',
            timestamp: new Date(Date.now() - 2100000),
            level: 'info',
            category: 'system',
            message: 'System backup completed',
            details: 'Daily backup to cloud storage successful',
            userId: 'system',
            source: 'Backup Service'
        },
        {
            id: '8',
            timestamp: new Date(Date.now() - 2400000),
            level: 'warning',
            category: 'inventory',
            message: 'Stock level below threshold',
            details: 'Multiple products require restocking',
            userId: 'system',
            source: 'Inventory Monitor'
        }
    ]);

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = !levelFilter || log.level === levelFilter;
        const matchesCategory = !categoryFilter || log.category === categoryFilter;
        const matchesTab = selectedTab === 'all' || log.level === selectedTab;

        return matchesSearch && matchesLevel && matchesCategory && matchesTab;
    });

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-yellow-600" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'info':
                return <Info className="w-4 h-4 text-blue-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getLevelBadge = (level: string) => {
        switch (level) {
            case 'success':
                return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>;
            case 'warning':
                return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
            case 'error':
                return <Badge variant="destructive">Error</Badge>;
            case 'info':
                return <Badge variant="default" className="bg-blue-100 text-blue-800">Info</Badge>;
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const getCategoryBadge = (category: string) => {
        const categoryColors = {
            system: 'bg-gray-100 text-gray-800',
            import: 'bg-purple-100 text-purple-800',
            inventory: 'bg-orange-100 text-orange-800',
            order: 'bg-green-100 text-green-800',
            user: 'bg-blue-100 text-blue-800'
        };

        return (
            <Badge variant="default" className={categoryColors[category as keyof typeof categoryColors]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
        );
    };

    const totalLogs = logs.length;
    const successLogs = logs.filter(log => log.level === 'success').length;
    const warningLogs = logs.filter(log => log.level === 'warning').length;
    const errorLogs = logs.filter(log => log.level === 'error').length;
    const infoLogs = logs.filter(log => log.level === 'info').length;

    const exportLogs = () => {
        const csvContent = [
            'Timestamp,Level,Category,Message,Details,User,Source',
            ...filteredLogs.map(log =>
                `"${log.timestamp.toISOString()}","${log.level}","${log.category}","${log.message}","${log.details || ''}","${log.userId || ''}","${log.source || ''}"`
            ).join('\n')
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">System Logs</h1>
                <p className="text-gray-600">Monitor system activity, errors, and user actions</p>
            </div>

            {/* Log Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                                <p className="text-2xl font-bold">{totalLogs}</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Success</p>
                                <p className="text-2xl font-bold text-green-600">{successLogs}</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Warnings</p>
                                <p className="text-2xl font-bold text-yellow-600">{warningLogs}</p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Errors</p>
                                <p className="text-2xl font-bold text-red-600">{errorLogs}</p>
                            </div>
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Info</p>
                                <p className="text-2xl font-bold text-blue-600">{infoLogs}</p>
                            </div>
                            <Info className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Logs Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>System Logs</CardTitle>
                        <Button onClick={exportLogs} variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export Logs
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
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={levelFilter} onValueChange={setLevelFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="All Levels" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Levels</SelectItem>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Categories</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                                <SelectItem value="import">Import</SelectItem>
                                <SelectItem value="inventory">Inventory</SelectItem>
                                <SelectItem value="order">Order</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tabs */}
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="success">Success</TabsTrigger>
                            <TabsTrigger value="warning">Warning</TabsTrigger>
                            <TabsTrigger value="error">Error</TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Table */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Source</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-mono text-sm">
                                            {log.timestamp.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getLevelIcon(log.level)}
                                                {getLevelBadge(log.level)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getCategoryBadge(log.category)}
                                        </TableCell>
                                        <TableCell className="font-medium max-w-xs truncate">
                                            {log.message}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-gray-600">
                                            {log.details}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {log.userId}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {log.source}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredLogs.length === 0 && (
                        <div className="text-center py-8">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-600">No logs found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
