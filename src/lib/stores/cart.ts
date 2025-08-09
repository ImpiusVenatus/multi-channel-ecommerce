import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '../types';

export interface CartItem {
    id: string;
    product: Product;
    variant: ProductVariant;
    quantity: number;
    price: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed values
    getTotalItems: () => number;
    getSubtotal: () => number;
    getTotal: () => number;
    getItemById: (itemId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product: Product, variant: ProductVariant, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(
                        item => item.product.id === product.id && item.variant.id === variant.id
                    );

                    if (existingItem) {
                        // Update existing item quantity
                        return {
                            items: state.items.map(item =>
                                item.id === existingItem.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    } else {
                        // Add new item
                        const newItem: CartItem = {
                            id: `${product.id}-${variant.id}`,
                            product,
                            variant,
                            quantity,
                            price: variant.price
                        };
                        return {
                            items: [...state.items, newItem]
                        };
                    }
                });
            },

            removeItem: (itemId: string) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== itemId)
                }));
            },

            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(itemId);
                    return;
                }

                set((state) => ({
                    items: state.items.map(item =>
                        item.id === itemId ? { ...item, quantity } : item
                    )
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set((state) => ({ isOpen: !state.isOpen }));
            },

            openCart: () => {
                set({ isOpen: true });
            },

            closeCart: () => {
                set({ isOpen: false });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getTotal: () => {
                // Add tax, shipping, etc. here if needed
                return get().getSubtotal();
            },

            getItemById: (itemId: string) => {
                return get().items.find(item => item.id === itemId);
            }
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
