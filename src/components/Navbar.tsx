import React from 'react';
import { ShoppingCart, Utensils, Info, Shield, Sparkles, UserPlus } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  currentView: 'home' | 'menu' | 'about' | 'cart' | 'checkout' | 'tracking' | 'admin-dashboard' | 'admin-orders' | 'admin-products';
  setCurrentView: (view: any) => void;
  cart: CartItem[];
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export default function Navbar({ currentView, setCurrentView, cart, isAdmin, setIsAdmin }: NavbarProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isUserView = !currentView.startsWith('admin-');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => {
              setIsAdmin(false);
              setCurrentView('home');
            }} 
            onDoubleClick={() => setCurrentView('admin-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo"
            title="Bosh sahifa (Admin uchun ikki marta bosing)"
          >
            <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              J
            </div>
            <div>
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-gray-900 group-hover:text-amber-500 transition-colors">
                Javohir <span className="text-amber-500">Manti</span>
              </span>
              <p className="text-[10px] font-mono tracking-widest text-amber-600 font-semibold uppercase">Milliy Taomlar</p>
            </div>
          </div>

          {/* Navigation Links for User */}
          {isUserView ? (
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentView('home')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'home' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-home-btn"
              >
                Bosh sahifa
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setCurrentView('menu')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'menu' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-menu-btn"
              >
                Bizning Menyular
                {currentView === 'menu' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setCurrentView('about')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'about' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-about-btn"
              >
                Biz haqimizda
                {currentView === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'admin-dashboard' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-admin-dash-btn"
              >
                Dashboard
                {currentView === 'admin-dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setCurrentView('admin-orders')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'admin-orders' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-admin-orders-btn"
              >
                Faol Buyurtmalar
                {currentView === 'admin-orders' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setCurrentView('admin-products')}
                className={`font-sans font-medium text-sm transition-colors relative py-1.5 ${
                  currentView === 'admin-products' ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
                id="nav-admin-products-btn"
              >
                Mahsulotlar
                {currentView === 'admin-products' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin Toggle button - Only shown when logged in as admin and in admin view */}
            {!isUserView && isAdmin && (
              <button
                onClick={() => {
                  setIsAdmin(false);
                  setCurrentView('home');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all border bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                title="Admin panelni yopish"
                id="admin-toggle-btn"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Chiqish (Admin)</span>
              </button>
            )}

            {/* Cart Button (Only for user) */}
            {isUserView && (
              <button
                onClick={() => setCurrentView('cart')}
                className={`relative p-2.5 rounded-xl border transition-all duration-300 ${
                  currentView === 'cart'
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-500'
                }`}
                id="cart-badge-btn"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 border-2 border-white text-white font-mono text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Sub Nav Menu */}
      <div className="md:hidden border-t border-gray-100 py-2.5 px-4 bg-gray-50/50 flex items-center justify-around gap-2 text-xs font-medium">
        {isUserView ? (
          <>
            <button 
              onClick={() => setCurrentView('home')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-home"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Bosh sahifa</span>
            </button>
            <button 
              onClick={() => setCurrentView('menu')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'menu' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-menu"
            >
              <Utensils className="w-4.5 h-4.5" />
              <span>Menyu</span>
            </button>
            <button 
              onClick={() => setCurrentView('about')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'about' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-about"
            >
              <Info className="w-4.5 h-4.5" />
              <span>Biz haqimizda</span>
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setCurrentView('admin-dashboard')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'admin-dashboard' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-admin-dash"
            >
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setCurrentView('admin-orders')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'admin-orders' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-admin-orders"
            >
              <span>Buyurtmalar</span>
            </button>
            <button 
              onClick={() => setCurrentView('admin-products')} 
              className={`flex flex-col items-center gap-1 ${currentView === 'admin-products' ? 'text-amber-500 font-semibold' : 'text-gray-500'}`}
              id="mob-nav-admin-products"
            >
              <span>Taomlar</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
