import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import {
  ShoppingBag,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Package,
  BarChart3,
  Settings
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Multi-Channel E-commerce Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Manage Your Products Across
                  <span className="text-primary"> All Channels</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Streamline your e-commerce operations with seamless integration
                  between SSActiveWear, Shopify, and your own storefront.
                  Real-time inventory sync across all platforms.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/admin">
                    Admin Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="h-32 w-32 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Powerful Features for Modern E-commerce
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage your multi-channel e-commerce business
              in one unified platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  Unified product catalog with advanced filtering, bulk operations,
                  and multi-variant support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Channel Sync</CardTitle>
                <CardDescription>
                  Real-time inventory synchronization across SSActiveWear,
                  Shopify, and your storefront.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>
                  Comprehensive analytics dashboard with sales reports,
                  inventory insights, and performance metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Automated Workflows</CardTitle>
                <CardDescription>
                  Set up automated product imports, inventory updates,
                  and order processing workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with data encryption,
                  backup systems, and 99.9% uptime guarantee.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Simple setup process with pre-built connectors for
                  popular e-commerce platforms and marketplaces.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Streamline Your E-commerce?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of businesses that trust Yupsis to manage
              their multi-channel e-commerce operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/admin">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Yupsis</h3>
              <p className="text-sm text-muted-foreground">
                Multi-channel e-commerce platform for modern businesses.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-foreground">Products</Link></li>
                <li><Link href="/admin" className="hover:text-foreground">Admin</Link></li>
                <li><Link href="/analytics" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Integrations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>SSActiveWear</li>
                <li>Shopify</li>
                <li>Custom APIs</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Yupsis. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
