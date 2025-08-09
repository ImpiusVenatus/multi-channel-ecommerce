import { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'

interface StorefrontLayoutProps {
    children: ReactNode
}

export default function StorefrontLayout({ children }: StorefrontLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}
