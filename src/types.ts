export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  rating: number;
  prepareTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cash' | 'click' | 'payme';
  date: string;
  notes?: string;
  deliveredTime?: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  minOrderValue?: number;
}
