import { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'

interface AdminLayoutProps {
    children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}

