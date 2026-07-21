import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Tag, Percent, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, PromoCode } from '../types';
import { PROMO_CODES } from '../data';

interface CartViewProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  setCurrentView: (view: any) => void;
  appliedPromo: PromoCode | null;
  setAppliedPromo: (promo: PromoCode | null) => void;
}

export default function CartView({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  setCurrentView, 
  appliedPromo, 
  setAppliedPromo 
}: CartViewProps) {
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 15000 : 0;
  
  // Calculate discount
  const discountAmount = appliedPromo 
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100) 
    : 0;

  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);

    if (!promoInput.trim()) {
      setPromoError("Iltimos, promo-kodni kiriting.");
      return;
    }

    const code = promoInput.trim().toUpperCase();
    const foundPromo = PROMO_CODES.find(p => p.code === code);

    if (!foundPromo) {
      setPromoError("Bunday promo-kod mavjud emas.");
      return;
    }

    if (foundPromo.minOrderValue && subtotal < foundPromo.minOrderValue) {
      setPromoError(`Ushbu promo-kod eng kamida ${foundPromo.minOrderValue.toLocaleString('uz-UZ')} Sōmlik buyurtmalar uchun amal qiladi.`);
      return;
    }

    setAppliedPromo(foundPromo);
    setPromoSuccess(`"${foundPromo.code}" promo-kodi muvaffaqiyatli qo'llanildi! ${foundPromo.discountPercent}% chegirma berildi.`);
    setPromoInput('');
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess(null);
    setPromoError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      <div>
        <h1 className="font-display font-extrabold text-3xl text-gray-950 tracking-tight flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-amber-500" />
          Savatingiz
        </h1>
        <p className="text-gray-500 text-sm mt-1">Siz tanlagan mazali milliy taomlar to'plami</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-6">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <p className="text-gray-900 font-bold text-lg">Savat bo'sh</p>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">Savatingiz hozircha bo'sh, menyudan maza qilib taomlar tanlang.</p>
          </div>
          <button 
            onClick={() => setCurrentView('menu')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold rounded-xl text-sm transition-all"
            id="cart-empty-go-menu"
          >
            Menyuni ko'rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-xs"
                  id={`cart-item-${item.product.id}`}
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                  />
                  
                  <div className="flex-grow min-w-0 space-y-1">
                    <span className="text-[10px] text-amber-600 font-mono font-bold uppercase tracking-widest">{item.product.category}</span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-gray-950 truncate">{item.product.name}</h3>
                    <p className="text-gray-500 text-xs font-mono font-semibold">
                      {item.product.price.toLocaleString('uz-UZ')} Sōm
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                    {/* Stepper */}
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                        id={`cart-minus-${item.product.id}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm font-bold text-gray-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                        id={`cart-plus-${item.product.id}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Icon */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      id={`cart-trash-${item.product.id}`}
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pricing Breakdown & Promo Code */}
          <div className="space-y-6">
            
            {/* Promo Code Form */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Tag className="w-4.5 h-4.5 text-amber-500" />
                Promo-kod kiritish
              </h3>

              {appliedPromo ? (
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-mono font-bold text-xs text-amber-700">{appliedPromo.code}</p>
                      <p className="text-[10px] text-amber-600">{appliedPromo.discountPercent}% chegirma qo'llandi</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleRemovePromo}
                    className="text-amber-700 hover:text-rose-500 font-bold text-xs"
                    id="remove-promo-btn"
                  >
                    O'chirish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MANTI20, YANGI..."
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-grow px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl text-xs font-mono tracking-wider focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900 uppercase"
                    id="promo-input-field"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    id="apply-promo-btn"
                  >
                    Qo'llash
                  </button>
                </form>
              )}

              {/* Status Notices */}
              {promoError && (
                <div className="flex items-start gap-1.5 text-rose-600 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{promoError}</span>
                </div>
              )}
              {promoSuccess && (
                <div className="flex items-start gap-1.5 text-emerald-600 text-xs">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{promoSuccess}</span>
                </div>
              )}
            </div>

            {/* Check/Summary Breakdown */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-gray-900">Buyurtma yakuni</h3>
              
              <div className="space-y-3 pt-2 text-xs font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>Savat summasi:</span>
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
                  <span className="font-bold text-gray-900">Jami to'lov:</span>
                  <div className="text-right">
                    <span className="font-mono text-lg font-extrabold text-amber-600">
                      {total.toLocaleString('uz-UZ')} Sōm
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo recommendation hint */}
              {!appliedPromo && (
                <div className="bg-gray-50 p-3 rounded-2xl text-[10px] text-gray-400 leading-normal flex gap-1">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                  <span>Yangi mijozmisiz? 15% chegirma olish uchun <b className="text-gray-600">YANGI</b> promo-kodini ishlating.</span>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-bold rounded-2xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer font-sans text-sm"
                id="cart-proceed-checkout"
              >
                Rasmiylashtirishga o'tish
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
