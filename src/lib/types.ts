// Core Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    cost: number;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    images: ProductImage[];
    categories: Category[];
    tags: string[];
    variants: ProductVariant[];
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
    sourceChannel: ChannelType;
    sourceId?: string; // External ID from source channel
}

export interface ProductVariant {
    id: string;
    productId: string;
    sku: string;
    name: string;
    attributes: Record<string, string>; // e.g., { size: "M", color: "Blue" }
    price: number;
    compareAtPrice?: number;
    cost: number;
    weight: number;
    inventory: InventoryLevel;
    images: ProductImage[];
    status: ProductStatus;
}

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    position: number;
    isPrimary: boolean;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    children?: Category[];
    image?: string;
}

export interface InventoryLevel {
    id: string;
    variantId: string;
    locationId: string;
    available: number;
    reserved: number;
    incoming: number;
    lastUpdated: Date;
}

// Channel Integration Types
export type ChannelType = 'ssactivewear' | 'shopify' | 'manual';

export interface Channel {
    id: string;
    name: string;
    type: ChannelType;
    status: ChannelStatus;
    config: ChannelConfig;
    lastSync: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChannelConfig {
    apiKey?: string;
    apiSecret?: string;
    storeUrl?: string;
    webhookUrl?: string;
    syncInterval: number; // minutes
    autoSync: boolean;
}

export type ChannelStatus = 'active' | 'inactive' | 'error' | 'syncing';

// SSActiveWear Integration Types
export interface SSActiveWearProduct {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    cost: number;
    weight: number;
    images: string[];
    categories: string[];
    variants: SSActiveWearVariant[];
    inventory: SSActiveWearInventory[];
}

export interface SSActiveWearVariant {
    id: string;
    sku: string;
    size: string;
    color: string;
    price: number;
    cost: number;
    weight: number;
    images: string[];
}

export interface SSActiveWearInventory {
    variantId: string;
    available: number;
    reserved: number;
    incoming: number;
}

// Shopify Integration Types
export interface ShopifyProduct {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at: string;
    handle: string;
    updated_at: string;
    published_at: string;
    template_suffix: string;
    status: string;
    published_scope: string;
    tags: string;
    admin_graphql_api_id: string;
    variants: ShopifyVariant[];
    options: ShopifyOption[];
    images: ShopifyImage[];
    image: ShopifyImage;
}

export interface ShopifyVariant {
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string;
    fulfillment_service: string;
    inventory_management: string;
    option1: string;
    option2: string;
    option3: string;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string;
    grams: number;
    image_id: number;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
}

export interface ShopifyOption {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
}

export interface ShopifyImage {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
    admin_graphql_api_id: string;
}

// Order Types
export interface Order {
    id: string;
    orderNumber: string;
    customer: Customer;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    channel: ChannelType;
    channelOrderId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    product: Product;
    variant: ProductVariant;
}

export interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: Address;
}

export interface Address {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

// Status Types
export type ProductStatus = 'active' | 'inactive' | 'draft' | 'archived';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Sync Types
export interface SyncJob {
    id: string;
    channelId: string;
    type: 'import' | 'export' | 'inventory';
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    totalItems: number;
    processedItems: number;
    errors: SyncError[];
    startedAt: Date;
    completedAt?: Date;
}

export interface SyncError {
    id: string;
    message: string;
    data?: any;
    timestamp: Date;
}

// Filter Types
export interface ProductFilters {
    search?: string;
    category?: string;
    status?: ProductStatus;
    priceRange?: {
        min: number;
        max: number;
    };
    inStock?: boolean;
    channel?: ChannelType;
}

export interface OrderFilters {
    search?: string;
    status?: OrderStatus;
    dateRange?: {
        start: Date;
        end: Date;
    };
    channel?: ChannelType;
}

