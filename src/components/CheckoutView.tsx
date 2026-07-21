import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, ShoppingBag, CreditCard, Landmark, DollarSign, ArrowLeft } from 'lucide-react';
import { CartItem, Order, PromoCode, OrderStatus } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedPromo: PromoCode | null;
  setCurrentView: (view: any) => void;
  placeOrder: (orderDetails: { name: string; phone: string; address: string; paymentMethod: 'cash' | 'click' | 'payme'; notes: string }) => void;
}

export default function CheckoutView({ cart, appliedPromo, setCurrentView, placeOrder }: CheckoutViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'click' | 'payme'>('cash');
  const [validationError, setValidationError] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 15000 : 0;
  
  const discountAmount = appliedPromo 
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100) 
    : 0;

  const total = subtotal - discountAmount + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Simple robust validation
    if (!name.trim()) {
      setValidationError("Ismingizni kiriting.");
      return;
    }
    if (phone.trim() === '+998' || phone.trim().length < 13) {
      setValidationError("To'liq telefon raqamingizni kiriting (Masalan: +998 90 123 45 67).");
      return;
    }
    if (!address.trim()) {
      setValidationError("Yetkazib berish manzilingizni to'liq kiriting.");
      return;
    }

    // Place the order
    placeOrder({
      name,
      phone,
      address,
      paymentMethod,
      notes
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.startsWith('+998')) {
      setPhone(val);
    } else if (val === '') {
      setPhone('+998 ');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Back to Cart & Title */}
      <div className="space-y-4">
        <button
          onClick={() => setCurrentView('cart')}
          className="flex items-center gap-1 text-gray-500 hover:text-amber-500 text-sm font-semibold transition-colors cursor-pointer group"
          id="checkout-back-btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Savatga qaytish
        </button>
        
        <div>
          <h1 className="font-display font-extrabold text-3xl text-gray-950 tracking-tight">
            Buyurtmani rasmiylashtirish
          </h1>
          <p className="text-gray-500 text-sm mt-1">Yetkazib berish ma'lumotlarini to'ldiring va buyurtmani tasdiqlang</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <h3 className="font-display font-bold text-base text-gray-950">1. Yetkazib berish ma'lumotlari</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 font-mono">Ismingiz *</label>
                <input
                  type="text"
                  required
                  placeholder="Jasur Abdullayev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900"
                  id="checkout-name-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 font-mono font-semibold">Telefon raqam *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900 font-mono"
                  id="checkout-phone-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 font-mono">Yetkazib berish manzili *</label>
              <input
                type="text"
                required
                placeholder="Toshkent sh., Chilonzor tumani, Lutfiy ko'chasi, 24-uy, 15-xonadon"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900"
                id="checkout-address-input"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 font-mono">Kuryer uchun izoh (Ixtiyoriy)</label>
              <textarea
                placeholder="Darvoza kodi, mo'ljal yoki boshqa muhim eslatmalar..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900 resize-none"
                id="checkout-notes-input"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <h3 className="font-display font-bold text-base text-gray-950">2. To'lov usuli</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Naqd pul */}
              <div
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-2 relative overflow-hidden ${
                  paymentMethod === 'cash'
                    ? 'border-amber-500 bg-amber-50/20 text-amber-900 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
                id="pay-cash-card"
              >
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xs">Naqd pul</span>
                <p className="text-[10px] text-gray-400">Kuryerga yetkazilganda</p>
                {paymentMethod === 'cash' && (
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-amber-500 rounded-full border border-white" />
                )}
              </div>

              {/* Click */}
              <div
                onClick={() => setPaymentMethod('click')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-2 relative overflow-hidden ${
                  paymentMethod === 'click'
                    ? 'border-blue-500 bg-blue-50/10 text-blue-900 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
                id="pay-click-card"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-extrabold text-xs font-mono">
                  CL
                </div>
                <span className="font-display font-bold text-xs">Click</span>
                <p className="text-[10px] text-gray-400">Onlayn Click tizimi</p>
                {paymentMethod === 'click' && (
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-blue-500 rounded-full border border-white" />
                )}
              </div>

              {/* Payme */}
              <div
                onClick={() => setPaymentMethod('payme')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-2 relative overflow-hidden ${
                  paymentMethod === 'payme'
                    ? 'border-teal-500 bg-teal-50/10 text-teal-900 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
                id="pay-payme-card"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 font-extrabold text-xs font-mono">
                  PM
                </div>
                <span className="font-display font-bold text-xs">Payme</span>
                <p className="text-[10px] text-gray-400">Onlayn Payme tizimi</p>
                {paymentMethod === 'payme' && (
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-teal-500 rounded-full border border-white" />
                )}
              </div>

            </div>
          </div>

          {validationError && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs font-semibold">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </form>

        {/* Order Summary Checkout List */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-6">
          <h3 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 pb-2 border-b border-gray-50">
            <ShoppingBag className="w-4.5 h-4.5 text-amber-500" />
            Sizning Buyurtmangiz
          </h3>

          <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 justify-between text-xs font-semibold">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center font-mono text-[10px] font-bold text-amber-600">
                    {item.quantity}x
                  </span>
                  <span className="text-gray-900 truncate">{item.product.name}</span>
                </div>
                <span className="font-mono text-gray-900 font-bold shrink-0">
                  {(item.product.price * item.quantity).toLocaleString('uz-UZ')} Sōm
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-50" />

          {/* Totals panel */}
          <div className="space-y-3 text-xs font-medium text-gray-500">
            <div className="flex justify-between">
              <span>Oraliq jami:</span>
              <span className="font-mono text-gray-900 font-bold">{subtotal.toLocaleString('uz-UZ')} Sōm</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-amber-600 font-semibold">
                <span>Chegirma ({appliedPromo.discountPercent}%):</span>
                <span className="font-mono">- {discountAmount.toLocaleString('uz-UZ')} Sōm</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Yetkazib berish:</span>
              <span className="font-mono text-gray-900 font-bold">{deliveryFee.toLocaleString('uz-UZ')} Sōm</span>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <div className="flex justify-between items-end text-sm">
              <span className="font-bold text-gray-900">Yakuniy to'lov:</span>
              <span className="font-mono text-lg font-extrabold text-amber-600">
                {total.toLocaleString('uz-UZ')} Sōm
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-bold rounded-2xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer font-sans text-sm"
            id="checkout-confirm-order-btn"
          >
            Buyurtmani tasdiqlash
          </button>
        </div>

      </div>

    </div>
  );
}
