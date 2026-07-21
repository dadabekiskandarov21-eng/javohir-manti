import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderSuccessView from './components/OrderSuccessView';
import AboutView from './components/AboutView';

// Admin views
import AdminDashboard from './components/AdminDashboard';
import AdminOrders from './components/AdminOrders';
import AdminProducts from './components/AdminProducts';
import AdminAuth from './components/AdminAuth';

import { Product, CartItem, Order, PromoCode, OrderStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data';

type ViewState = 'home' | 'menu' | 'about' | 'cart' | 'checkout' | 'tracking' | 'admin-dashboard' | 'admin-orders' | 'admin-products';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('jm_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('jm_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    const savedOrders = localStorage.getItem('jm_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem('jm_orders', JSON.stringify(INITIAL_ORDERS));
    }

    const savedCart = localStorage.getItem('jm_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedActiveOrder = localStorage.getItem('jm_active_order_id');
    if (savedActiveOrder) {
      setActiveOrderId(savedActiveOrder);
    }
  }, []);

  // Save Cart to local storage when modified
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('jm_cart', JSON.stringify(newCart));
  };

  // Cart Handlers
  const addToCart = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const filtered = cart.filter(item => item.product.id !== productId);
    saveCart(filtered);
  };

  // Order Handlers
  const placeOrder = (details: { 
    name: string; 
    phone: string; 
    address: string; 
    paymentMethod: 'cash' | 'click' | 'payme'; 
    notes: string;
  }) => {
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const deliveryFee = 15000;
    const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
    const total = subtotal - discountAmount + deliveryFee;

    const newOrderId = `JM-${Math.floor(Math.random() * 9000) + 1000}`;
    const now = new Date();
    const formattedTime = `Bugun, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: Order = {
      id: newOrderId,
      name: details.name,
      phone: details.phone,
      address: details.address,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryFee,
      total,
      status: 'pending',
      paymentMethod: details.paymentMethod,
      date: formattedTime,
      notes: details.notes
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('jm_orders', JSON.stringify(updatedOrders));

    // Set active tracking details
    setActiveOrderId(newOrderId);
    localStorage.setItem('jm_active_order_id', newOrderId);

    // Clear cart and state parameters
    saveCart([]);
    setAppliedPromo(null);
    setCurrentView('tracking');
  };

  // Admin Order update handler (syncs directly to customer tracking views)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        if (status === 'delivered') {
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          return { ...o, status, deliveredTime: timeStr };
        }
        return { ...o, status };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('jm_orders', JSON.stringify(updated));
  };

  // Admin Products management handlers
  const addProduct = (newProd: Omit<Product, 'rating'>) => {
    const completeProd: Product = {
      ...newProd,
      rating: 5.0 // initial premium rating
    };
    const updated = [...products, completeProd];
    setProducts(updated);
    localStorage.setItem('jm_products', JSON.stringify(updated));
  };

  const updateProduct = (updatedProd: Product) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    setProducts(updated);
    localStorage.setItem('jm_products', JSON.stringify(updated));
  };

  const deleteProduct = (productId: string) => {
    const filtered = products.filter(p => p.id !== productId);
    setProducts(filtered);
    localStorage.setItem('jm_products', JSON.stringify(filtered));
  };

  // Fetch current active order object for tracking
  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[orders.length - 1];

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* Universal header navigation */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        cart={cart}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Primary views dispatcher */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView 
            products={products} 
            setCurrentView={setCurrentView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'menu' && (
          <MenuView 
            products={products} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'cart' && (
          <CartView 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            setCurrentView={setCurrentView}
            appliedPromo={appliedPromo}
            setAppliedPromo={setAppliedPromo}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView 
            cart={cart}
            appliedPromo={appliedPromo}
            setCurrentView={setCurrentView}
            placeOrder={placeOrder}
          />
        )}

        {currentView === 'tracking' && activeOrder && (
          <OrderSuccessView 
            order={activeOrder} 
            setCurrentView={setCurrentView} 
          />
        )}

        {/* Admin Views */}
        {currentView.startsWith('admin-') && !isAdmin && (
          <AdminAuth 
            onSuccess={() => setIsAdmin(true)} 
            onCancel={() => setCurrentView('home')} 
          />
        )}

        {currentView === 'admin-dashboard' && isAdmin && (
          <AdminDashboard 
            orders={orders} 
            products={products} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'admin-orders' && isAdmin && (
          <AdminOrders 
            orders={orders} 
            updateOrderStatus={updateOrderStatus} 
          />
        )}

        {currentView === 'admin-products' && isAdmin && (
          <AdminProducts 
            products={products} 
            addProduct={addProduct} 
            updateProduct={updateProduct}
            deleteProduct={deleteProduct} 
          />
        )}
      </main>

      {/* Unified footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900 mt-auto font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-900">
            
            {/* Column 1: Intro */}
            <div className="space-y-4">
              <span className="font-display font-extrabold text-white text-xl">
                Javohir <span className="text-amber-500">Manti</span>
              </span>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Asriy an'analar va haqiqiy milliy oshxona sirlari asosida tayyorlanadigan, o'zining nihoyatda suvli go'shti, mayin xamiri va takrorlanmas ta'mi bilan mashhur bo'lgan afsonaviy Javohir manti brendi. Har bir luqmada o'zgacha mehr va lazzat!
              </p>
            </div>

            {/* Column 2: Working hours */}
            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Ish tartibi</h4>
              <p className="text-xs text-gray-500">Har kuni: 09:00 - 23:00</p>
              <p className="text-[10px] text-amber-500/80 font-medium">Barcha buyurtmalar issiq va pishgan holida thermo-boxlarda yetkaziladi.</p>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Aloqa</h4>
              <p className="text-xs text-gray-500">
                Telefon:{" "}
                <a 
                  href="tel:+998947264627" 
                  className="text-amber-500 hover:text-amber-400 font-semibold transition-colors underline decoration-dotted decoration-amber-500/30"
                  title="Qo'ng'iroq qilish"
                >
                  +998 94 726 46 27
                </a>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Manzil:{" "}
                <a 
                  href="https://yandex.com/maps/?text=Surxondaryo+v.+Sherobod+tumani+Mustaqillik+k.+67B" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-500 transition-colors underline decoration-dotted decoration-gray-600 hover:decoration-amber-500"
                  title="Yandex xaritada ko'rish"
                >
                  Surxondaryo v., Sherobod tumani, Mustaqillik k., 67B
                </a>
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
            <p>© {new Date().getFullYear()} Javohir Manti. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition-colors">Foydalanish shartlari</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Maxfiylik siyosati</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
