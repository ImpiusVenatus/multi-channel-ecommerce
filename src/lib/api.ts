import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
    Product,
    Channel,
    Order,
    SyncJob,
    ApiResponse,
    PaginatedResponse,
    ProductFilters,
    OrderFilters,
    SSActiveWearProduct,
    ShopifyProduct
} from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Generic API methods
export const api = {
    // Products
    products: {
        getAll: (filters?: ProductFilters, page = 1, limit = 20) =>
            apiClient.get<PaginatedResponse<Product>>('/products', {
                params: { ...filters, page, limit }
            }),

        getById: (id: string) =>
            apiClient.get<ApiResponse<Product>>(`/products/${id}`),

        create: (product: Partial<Product>) =>
            apiClient.post<ApiResponse<Product>>('/products', product),

        update: (id: string, product: Partial<Product>) =>
            apiClient.put<ApiResponse<Product>>(`/products/${id}`, product),

        delete: (id: string) =>
            apiClient.delete<ApiResponse<void>>(`/products/${id}`),

        bulkUpdate: (products: Partial<Product>[]) =>
            apiClient.put<ApiResponse<Product[]>>('/products/bulk', { products }),
    },

    // Channels
    channels: {
        getAll: () =>
            apiClient.get<ApiResponse<Channel[]>>('/channels'),

        getById: (id: string) =>
            apiClient.get<ApiResponse<Channel>>(`/channels/${id}`),

        create: (channel: Partial<Channel>) =>
            apiClient.post<ApiResponse<Channel>>('/channels', channel),

        update: (id: string, channel: Partial<Channel>) =>
            apiClient.put<ApiResponse<Channel>>(`/channels/${id}`, channel),

        delete: (id: string) =>
            apiClient.delete<ApiResponse<void>>(`/channels/${id}`),

        testConnection: (id: string) =>
            apiClient.post<ApiResponse<{ connected: boolean }>>(`/channels/${id}/test`),
    },

    // Orders
    orders: {
        getAll: (filters?: OrderFilters, page = 1, limit = 20) =>
            apiClient.get<PaginatedResponse<Order>>('/orders', {
                params: { ...filters, page, limit }
            }),

        getById: (id: string) =>
            apiClient.get<ApiResponse<Order>>(`/orders/${id}`),

        updateStatus: (id: string, status: string) =>
            apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status }),
    },

    // Sync Jobs
    sync: {
        getAll: () =>
            apiClient.get<ApiResponse<SyncJob[]>>('/sync'),

        getById: (id: string) =>
            apiClient.get<ApiResponse<SyncJob>>(`/sync/${id}`),

        create: (job: Partial<SyncJob>) =>
            apiClient.post<ApiResponse<SyncJob>>('/sync', job),

        cancel: (id: string) =>
            apiClient.post<ApiResponse<void>>(`/sync/${id}/cancel`),
    },

    // SSActiveWear Integration
    ssactivewear: {
        getProducts: (page = 1, limit = 50) =>
            apiClient.get<PaginatedResponse<SSActiveWearProduct>>('/integrations/ssactivewear/products', {
                params: { page, limit }
            }),

        importProducts: (productIds: string[]) =>
            apiClient.post<ApiResponse<SyncJob>>('/integrations/ssactivewear/import', { productIds }),

        syncInventory: () =>
            apiClient.post<ApiResponse<SyncJob>>('/integrations/ssactivewear/sync-inventory'),

        getCategories: () =>
            apiClient.get<ApiResponse<string[]>>('/integrations/ssactivewear/categories'),
    },

    // Shopify Integration
    shopify: {
        getProducts: (page = 1, limit = 50) =>
            apiClient.get<PaginatedResponse<ShopifyProduct>>('/integrations/shopify/products', {
                params: { page, limit }
            }),

        exportProducts: (productIds: string[]) =>
            apiClient.post<ApiResponse<SyncJob>>('/integrations/shopify/export', { productIds }),

        syncInventory: () =>
            apiClient.post<ApiResponse<SyncJob>>('/integrations/shopify/sync-inventory'),

        getCollections: () =>
            apiClient.get<ApiResponse<any[]>>('/integrations/shopify/collections'),
    },

    // Analytics
    analytics: {
        getDashboard: () =>
            apiClient.get<ApiResponse<any>>('/analytics/dashboard'),

        getSalesReport: (startDate: string, endDate: string) =>
            apiClient.get<ApiResponse<any>>('/analytics/sales', {
                params: { startDate, endDate }
            }),

        getInventoryReport: () =>
            apiClient.get<ApiResponse<any>>('/analytics/inventory'),
    },
};

// Utility functions for API responses
export const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    if (response.data.success) {
        return response.data.data!;
    }
    throw new Error(response.data.error || 'API request failed');
};

export const handlePaginatedResponse = <T>(response: AxiosResponse<PaginatedResponse<T>>): PaginatedResponse<T> => {
    return response.data;
};

// Error handling utilities
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const handleApiError = (error: any): never => {
    if (error.response) {
        throw new ApiError(
            error.response.data?.error || 'API request failed',
            error.response.status,
            error.response.data?.code
        );
    }
    throw new ApiError(error.message || 'Network error', 0);
};

export default api;

