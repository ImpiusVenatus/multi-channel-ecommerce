'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Settings,
    User,
    Bell,
    Shield,
    Globe,
    CreditCard,
    Save,
    Trash2,
    Download,
    Upload
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
        marketing: true
    });

    const [preferences, setPreferences] = useState({
        language: 'en',
        timezone: 'UTC',
        currency: 'USD',
        theme: 'system'
    });

    const [security, setSecurity] = useState({
        twoFactor: false,
        sessionTimeout: '24h',
        passwordExpiry: '90d'
    });

    const handleSave = () => {
        // Handle settings save
        console.log('Settings saved:', { notifications, preferences, security });
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account preferences and system settings</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" defaultValue="John" />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                                </div>
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" defaultValue="Acme Corp" />
                                </div>
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us about yourself..."
                                        defaultValue="E-commerce enthusiast and business owner"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Business Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="businessName">Business Name</Label>
                                    <Input id="businessName" defaultValue="Yupsis Store" />
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" defaultValue="https://yupsis.com" />
                                </div>
                                <div>
                                    <Label htmlFor="address">Business Address</Label>
                                    <Textarea
                                        id="address"
                                        defaultValue="123 Business St, Suite 100, City, State 12345"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="taxId">Tax ID</Label>
                                    <Input id="taxId" defaultValue="12-3456789" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold">Order Notifications</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">New Orders</p>
                                            <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                                        </div>
                                        <Switch
                                            checked={notifications.email}
                                            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Order Updates</p>
                                            <p className="text-sm text-gray-600">Receive updates on order status changes</p>
                                        </div>
                                        <Switch
                                            checked={notifications.push}
                                            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Low Stock Alerts</p>
                                            <p className="text-sm text-gray-600">Get notified when products are running low</p>
                                        </div>
                                        <Switch
                                            checked={notifications.sms}
                                            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Marketing & Updates</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Newsletter</p>
                                            <p className="text-sm text-gray-600">Receive updates about new features and products</p>
                                        </div>
                                        <Switch
                                            checked={notifications.marketing}
                                            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences */}
                <TabsContent value="preferences" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Display & Language</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="language">Language</Label>
                                    <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="EST">Eastern Time</SelectItem>
                                            <SelectItem value="PST">Pacific Time</SelectItem>
                                            <SelectItem value="GMT">GMT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select value={preferences.currency} onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD ($)</SelectItem>
                                            <SelectItem value="EUR">EUR (€)</SelectItem>
                                            <SelectItem value="GBP">GBP (£)</SelectItem>
                                            <SelectItem value="CAD">CAD (C$)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Data & Export</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Manage your data and export options
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export All Data
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Import Data
                                    </Button>
                                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Security Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                    </div>
                                    <Switch
                                        checked={security.twoFactor}
                                        onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                                    <Select value={security.sessionTimeout} onValueChange={(value) => setSecurity(prev => ({ ...prev, sessionTimeout: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1h">1 hour</SelectItem>
                                            <SelectItem value="8h">8 hours</SelectItem>
                                            <SelectItem value="24h">24 hours</SelectItem>
                                            <SelectItem value="7d">7 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="passwordExpiry">Password Expiry</Label>
                                    <Select value={security.passwordExpiry} onValueChange={(value) => setSecurity(prev => ({ ...prev, passwordExpiry: value }))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30d">30 days</SelectItem>
                                            <SelectItem value="60d">60 days</SelectItem>
                                            <SelectItem value="90d">90 days</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Current Session</p>
                                            <p className="text-sm text-gray-600">Chrome on Windows • 192.168.1.100</p>
                                        </div>
                                        <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Mobile Session</p>
                                            <p className="text-sm text-gray-600">Safari on iPhone • 192.168.1.101</p>
                                        </div>
                                        <Badge variant="secondary">2 hours ago</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Integrations */}
                <TabsContent value="integrations" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Third-Party Integrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Payment Gateway</p>
                                            <p className="text-sm text-gray-600">Stripe • Connected</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Configure</Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Globe className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">E-commerce Platform</p>
                                            <p className="text-sm text-gray-600">Shopify • Connected</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Configure</Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Settings className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Analytics</p>
                                            <p className="text-sm text-gray-600">Google Analytics • Not connected</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Connect</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>
        </main>
    );
}
