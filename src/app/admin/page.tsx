"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import {
    Package,
    ShoppingCart,
    TrendingUp,
    Users,
    Settings,
    Download,
    Upload,
    BarChart3,
    AlertCircle,
    CheckCircle,
    Clock
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const stats = {
    totalProducts: 1247,
    activeProducts: 1189,
    totalOrders: 342,
    pendingOrders: 23,
    totalRevenue: 45678.90,
    monthlyGrowth: 12.5,
    lowStockItems: 15,
    syncJobs: 3
}

const recentActivities = [
    {
        id: "1",
        type: "import",
        message: "Imported 45 products from SSActiveWear",
        status: "completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        channel: "ssactivewear"
    },
    {
        id: "2",
        type: "export",
        message: "Exported 23 products to Shopify",
        status: "running",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        channel: "shopify"
    },
    {
        id: "3",
        type: "inventory",
        message: "Inventory sync completed",
        status: "completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        channel: "all"
    },
    {
        id: "4",
        type: "order",
        message: "New order received #ORD-2024-001",
        status: "pending",
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
        channel: "shopify"
    }
]

export default function AdminDashboard() {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "running":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
            case "running":
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Running</Badge>
            case "pending":
                return <Badge variant="outline" className="border-yellow-200 text-yellow-800">Pending</Badge>
            default:
                return <Badge variant="outline">Unknown</Badge>
        }
    }

    const formatTimeAgo = (date: Date) => {
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) return "Just now"
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`

        const diffInHours = Math.floor(diffInMinutes / 60)
        if (diffInHours < 24) return `${diffInHours}h ago`

        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays}d ago`
    }

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your multi-channel e-commerce operations
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/admin/products">
                                <Package className="mr-2 h-4 w-4" />
                                Manage Products
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/admin/import">
                                <Upload className="mr-2 h-4 w-4" />
                                Import Products
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.activeProducts} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.pendingOrders} pending
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                +{stats.monthlyGrowth}% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.lowStockItems}</div>
                            <p className="text-xs text-muted-foreground">
                                Need attention
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and operations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-20 flex-col" asChild>
                                    <Link href="/admin/import">
                                        <Upload className="h-6 w-6 mb-2" />
                                        Import Products
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col" asChild>
                                    <Link href="/admin/inventory">
                                        <Package className="h-6 w-6 mb-2" />
                                        Manage Inventory
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col" asChild>
                                    <Link href="/admin/orders">
                                        <ShoppingCart className="h-6 w-6 mb-2" />
                                        View Orders
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col" asChild>
                                    <Link href="/admin/analytics">
                                        <BarChart3 className="h-6 w-6 mb-2" />
                                        Analytics
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest system activities and sync jobs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        {getStatusIcon(activity.status)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {activity.channel}
                                                </Badge>
                                                {getStatusBadge(activity.status)}
                                                <span className="text-xs text-muted-foreground">
                                                    {formatTimeAgo(activity.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Integration Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Integration Status</CardTitle>
                        <CardDescription>
                            Monitor your connected channels and sync status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">SSActiveWear</p>
                                        <p className="text-sm text-muted-foreground">Connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">Shopify</p>
                                        <p className="text-sm text-muted-foreground">Connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">Manual Products</p>
                                        <p className="text-sm text-muted-foreground">Active</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

