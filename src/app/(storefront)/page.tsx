import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, TrendingUp, Star } from 'lucide-react'

export default function StorefrontPage() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to Yupsis Store</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover our curated collection of high-quality products from multiple channels
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/products">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Browse Products
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/cart">
                            View Cart
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <CardTitle>Multi-Channel</CardTitle>
                        <CardDescription>
                            Products sourced from multiple channels for the best selection
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <Star className="h-8 w-8 text-primary" />
                        <CardTitle>Quality Assured</CardTitle>
                        <CardDescription>
                            All products are carefully curated and quality-checked
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <ShoppingBag className="h-8 w-8 text-primary" />
                        <CardTitle>Easy Shopping</CardTitle>
                        <CardDescription>
                            Seamless shopping experience with real-time inventory
                        </CardDescription>
                    </CardHeader>
                </Card>
            </section>
        </div>
    )
}
