'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Database, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { useState } from 'react';

interface ImportJob {
    id: string;
    channel: string;
    type: 'products' | 'inventory' | 'orders';
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    totalItems: number;
    processedItems: number;
    errors: number;
    startedAt: Date;
    completedAt?: Date;
}

export default function ImportPage() {
    const [selectedChannel, setSelectedChannel] = useState('');
    const [importType, setImportType] = useState<'products' | 'inventory' | 'orders'>('products');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImporting, setIsImporting] = useState(false);

    // Mock import jobs
    const [importJobs, setImportJobs] = useState<ImportJob[]>([
        {
            id: '1',
            channel: 'SSActiveWear',
            type: 'products',
            status: 'completed',
            progress: 100,
            totalItems: 150,
            processedItems: 150,
            errors: 2,
            startedAt: new Date(Date.now() - 3600000),
            completedAt: new Date(Date.now() - 3000000)
        },
        {
            id: '2',
            channel: 'Shopify',
            type: 'inventory',
            status: 'running',
            progress: 65,
            totalItems: 200,
            processedItems: 130,
            errors: 0,
            startedAt: new Date(Date.now() - 1800000)
        },
        {
            id: '3',
            channel: 'Manual',
            type: 'products',
            status: 'failed',
            progress: 25,
            totalItems: 50,
            processedItems: 12,
            errors: 5,
            startedAt: new Date(Date.now() - 7200000)
        }
    ]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleImport = () => {
        if (!selectedChannel || !selectedFile) return;

        setIsImporting(true);

        // Simulate import process
        const newJob: ImportJob = {
            id: Date.now().toString(),
            channel: selectedChannel,
            type: importType,
            status: 'running',
            progress: 0,
            totalItems: 100,
            processedItems: 0,
            errors: 0,
            startedAt: new Date()
        };

        setImportJobs(prev => [newJob, ...prev]);

        // Simulate progress updates
        const interval = setInterval(() => {
            setImportJobs(prev => prev.map(job => {
                if (job.id === newJob.id) {
                    const newProgress = Math.min(job.progress + 10, 100);
                    const newProcessedItems = Math.floor((newProgress / 100) * job.totalItems);

                    if (newProgress === 100) {
                        clearInterval(interval);
                        setIsImporting(false);
                        return {
                            ...job,
                            status: 'completed',
                            progress: 100,
                            processedItems: job.totalItems,
                            completedAt: new Date()
                        };
                    }

                    return {
                        ...job,
                        progress: newProgress,
                        processedItems: newProcessedItems
                    };
                }
                return job;
            }));
        }, 500);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'running':
                return <Clock className="w-4 h-4 text-blue-600" />;
            case 'failed':
                return <AlertCircle className="w-4 h-4 text-red-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
            case 'running':
                return <Badge variant="default" className="bg-blue-100 text-blue-800">Running</Badge>;
            case 'failed':
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Import Data</h1>
                <p className="text-gray-600">Import products, inventory, and orders from external channels</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Import Configuration */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                Import Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="channel">Source Channel</Label>
                                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a channel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ssactivewear">SSActiveWear</SelectItem>
                                        <SelectItem value="shopify">Shopify</SelectItem>
                                        <SelectItem value="manual">Manual Upload</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="type">Import Type</Label>
                                <Select value={importType} onValueChange={(value: any) => setImportType(value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="products">Products</SelectItem>
                                        <SelectItem value="inventory">Inventory</SelectItem>
                                        <SelectItem value="orders">Orders</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="file">File Upload</Label>
                                <div className="mt-2">
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".csv,.xlsx,.json"
                                        onChange={handleFileSelect}
                                        className="cursor-pointer"
                                    />
                                </div>
                                {selectedFile && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                        <FileText className="w-4 h-4" />
                                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={handleImport}
                                disabled={!selectedChannel || !selectedFile || isImporting}
                                className="w-full"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {isImporting ? 'Importing...' : 'Start Import'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Import Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Import Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {importJobs.filter(job => job.status === 'completed').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Successful</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {importJobs.filter(job => job.status === 'failed').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Failed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {importJobs.filter(job => job.status === 'running').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Running</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-600">
                                        {importJobs.reduce((total, job) => total + job.processedItems, 0)}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Items</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Import History */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Import History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {importJobs.map((job) => (
                                    <div key={job.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(job.status)}
                                                <div>
                                                    <h4 className="font-semibold">{job.channel} - {job.type}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {job.processedItems} of {job.totalItems} items processed
                                                    </p>
                                                </div>
                                            </div>
                                            {getStatusBadge(job.status)}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{job.progress}%</span>
                                            </div>
                                            <Progress value={job.progress} className="h-2" />

                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Started: {job.startedAt.toLocaleTimeString()}</span>
                                                {job.completedAt && (
                                                    <span>Completed: {job.completedAt.toLocaleTimeString()}</span>
                                                )}
                                            </div>

                                            {job.errors > 0 && (
                                                <div className="text-sm text-red-600">
                                                    {job.errors} errors encountered
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
