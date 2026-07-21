import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MapPin, Phone, CreditCard, ChevronRight, MessageSquare, PhoneCall, X, User } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderSuccessViewProps {
  order: Order;
  setCurrentView: (view: any) => void;
}

export default function OrderSuccessView({ order, setCurrentView }: OrderSuccessViewProps) {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callState, setCallState] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [dialogueText, setDialogueText] = useState('Chaqirilmoqda...');
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  // Stepper phase levels
  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 1;
      case 'preparing': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = getStatusStep(order.status);

  // Simulate incoming call sound or visual ring
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (callModalOpen && callState === 'calling') {
      timer1 = setTimeout(() => {
        setCallState('connected');
        setDialogueText("Assalomu alaykum! Javohir Manti kuryeriman, Farruxman. Buyurtmangizni hozirgina oshxonadan issiq holda oldim, 10 daqiqada yetib boraman. Uydamisiz, uka?");
      }, 2000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [callModalOpen, callState]);

  const handleUserResponse = (text: string, responseIdx: number) => {
    setSelectedResponse(text);
    if (responseIdx === 1) {
      setDialogueText("Rahmat! Hozir uchib boraman, tandir somsangiz sovub qolmasin. Yoqimli ishtaha!");
    } else if (responseIdx === 2) {
      setDialogueText("Bo'pti akam, eshik qo'ng'irog'ini chalib, ostonada qoldirib ketaman. Xayr!");
    } else {
      setDialogueText("Xo'p bo'ladi aka, hozir yetib boraman!");
    }
    
    setTimeout(() => {
      setCallState('ended');
    }, 3000);
  };

  const closeCall = () => {
    setCallModalOpen(false);
    setCallState('calling');
    setDialogueText('Chaqirilmoqda...');
    setSelectedResponse(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Success Badge Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-emerald-500 mb-2">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-gray-950 tracking-tight">
          Buyurtmangiz qabul qilindi!
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Buyurtmangiz muvaffaqiyatli ro'yxatga olindi. ID raqami: <span className="font-mono font-bold text-gray-950">{order.id}</span>
        </p>
      </div>

      {/* Live Order Stepper Tracking */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-8">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <h3 className="font-display font-bold text-base text-gray-950">Buyurtma holati (Jonli kuzatuv)</h3>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
            Real vaqtda yangilanadi
          </span>
        </div>

        {/* The Visual Stepper */}
        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-gray-100 -z-0">
            <div 
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-4 relative z-10 text-center">
            {/* Step 1: Qabul qilindi */}
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all ${
                currentStep >= 1 
                  ? 'bg-amber-500 border-amber-500 text-gray-950 shadow-md shadow-amber-500/10' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className={`text-[11px] sm:text-xs font-bold transition-colors ${currentStep >= 1 ? 'text-gray-950' : 'text-gray-400'}`}>
                Qabul qilindi
              </span>
            </div>

            {/* Step 2: Tayyorlanmoqda */}
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all ${
                currentStep >= 2 
                  ? 'bg-amber-500 border-amber-500 text-gray-950 shadow-md shadow-amber-500/10' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <span className={`text-[11px] sm:text-xs font-bold transition-colors ${currentStep >= 2 ? 'text-gray-950' : 'text-gray-400'}`}>
                Tayyorlanmoqda
              </span>
            </div>

            {/* Step 3: Yo'lda */}
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all ${
                currentStep >= 3 
                  ? 'bg-amber-500 border-amber-500 text-gray-950 shadow-md shadow-amber-500/10' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                3
              </div>
              <span className={`text-[11px] sm:text-xs font-bold transition-colors ${currentStep >= 3 ? 'text-gray-950' : 'text-gray-400'}`}>
                Kuryer yo'lda
              </span>
            </div>

            {/* Step 4: Yetkazildi */}
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all ${
                currentStep >= 4 
                  ? 'bg-amber-500 border-amber-500 text-gray-950 shadow-md shadow-amber-500/10' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                4
              </div>
              <span className={`text-[11px] sm:text-xs font-bold transition-colors ${currentStep >= 4 ? 'text-gray-950' : 'text-gray-400'}`}>
                Yetkazildi
              </span>
            </div>
          </div>
        </div>

        {/* Stepper Status Descriptions and Kuryer Action */}
        <div className="bg-gray-50 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="space-y-1 font-sans">
            <p className="font-bold text-sm text-gray-900">
              {order.status === 'pending' && "Buyurtmangiz navbatda turibdi..."}
              {order.status === 'preparing' && "Oshpazimiz manti va somsalarni tayyorlamoqda..."}
              {order.status === 'on_the_way' && "Kuryerimiz buyurtmangizni olib siz tomon yo'lga chiqdi!"}
              {order.status === 'delivered' && (order.deliveredTime ? `Taom soat ${order.deliveredTime} da yetkazildi. Yoqimli ishtaha tilaymiz!` : "Taom yetkazildi. Yoqimli ishtaha tilaymiz!")}
            </p>
            <p className="text-xs text-gray-500">
              {order.status === 'pending' && "Oshxonamiz tezda buyurtmani tasdiqlaydi."}
              {order.status === 'preparing' && "Manti maza qilib bug'da bug'lanyapti."}
              {order.status === 'on_the_way' && "Kuryer: Farrux (+998 90 999 00 11)."}
              {order.status === 'delivered' && `Bizni tanlaganingiz uchun tashakkur!`}
            </p>
          </div>

          {/* Interactive Call Button (Only if on the way or preparing) */}
          {order.status === 'on_the_way' && (
            <button
              onClick={() => setCallModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer"
              id="call-kuryer-btn"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              Kuryerga qo'ng'iroq
            </button>
          )}
        </div>
      </div>

      {/* Order Summary Checkout Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
        <h3 className="font-display font-bold text-base text-gray-950">Buyurtma tafsilotlari</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans">
          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Yetkazish manzili</p>
                <p className="text-xs text-gray-500 leading-normal">{order.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Telefon raqam</p>
                <p className="text-xs text-gray-500 font-mono">{order.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <CreditCard className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">To'lov turi</p>
                <p className="text-xs text-gray-500 uppercase">
                  {order.paymentMethod === 'cash' && "Naqd pul (kuryerga)"}
                  {order.paymentMethod === 'click' && "Click Onlayn"}
                  {order.paymentMethod === 'payme' && "Payme Onlayn"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">To'lov summasi</p>
                <p className="text-xs text-gray-500 font-mono font-bold text-amber-600">
                  {order.total.toLocaleString('uz-UZ')} Sōm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Item List */}
        <div className="pt-4 border-t border-gray-50 space-y-3">
          <p className="text-xs font-bold uppercase text-gray-400 font-mono tracking-wider">Xaridlar ro'yxati</p>
          {order.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">{item.product.name} <span className="text-gray-400 font-mono">({item.quantity}x)</span></span>
              <span className="font-mono text-gray-900">{(item.product.price * item.quantity).toLocaleString('uz-UZ')} Sōm</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentView('menu')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold rounded-xl text-sm transition-all"
          id="success-back-to-menu-btn"
        >
          Yana taom buyurtma qilish
        </button>
      </div>

      {/* Call Kuryer Modal Simulator */}
      <AnimatePresence>
        {callModalOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCall}
              className="absolute inset-0 bg-gray-950/80"
              id="call-overlay"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-gray-900 border border-gray-800 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl z-10 flex flex-col items-center text-center space-y-6"
              id="call-modal-box"
            >
              {/* Close Icon */}
              <button
                onClick={closeCall}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                id="call-modal-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">Qo'ng'iroq qilinmoqda</p>
                <h3 className="font-display font-extrabold text-xl text-white">Farrux (Kuryer)</h3>
                <p className="text-xs text-gray-500 font-mono">+998 90 999 00 11</p>
              </div>

              {/* Avatar Animation */}
              <div className="relative">
                <div className="w-24 h-24 bg-amber-500/10 border-2 border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
                  <User className="w-10 h-10 stroke-[1.5]" />
                </div>
                {callState === 'calling' && (
                  <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping opacity-75" />
                )}
              </div>

              {/* Dialogue Transcript Bubble */}
              <div className="w-full bg-gray-950/60 p-4 rounded-2xl border border-gray-800/80 min-h-24 flex items-center justify-center">
                <p className="text-xs text-gray-300 italic leading-relaxed">
                  "{dialogueText}"
                </p>
              </div>

              {/* User Dialogue Choices */}
              {callState === 'connected' && !selectedResponse && (
                <div className="w-full flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={() => handleUserResponse("Ha, akam uydaman, kutaveraman!", 1)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-gray-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    id="response-option-1"
                  >
                    "Ha, akam uydaman, kutaveraman!"
                  </button>
                  <button
                    onClick={() => handleUserResponse("Rahmat aka, eshik oldida qoldirib ketavering.", 2)}
                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    id="response-option-2"
                  >
                    "Eshik oldida qoldirib ketavering."
                  </button>
                </div>
              )}

              {/* Ending Status */}
              {callState === 'ended' && (
                <div className="text-xs font-semibold text-rose-500 py-1.5 animate-pulse">
                  Qo'ng'iroq yakunlandi
                </div>
              )}

              {/* Red Decline Button */}
              <button
                onClick={closeCall}
                className="w-12 h-12 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-rose-600/15"
                id="hang-up-btn"
              >
                <Phone className="w-5 h-5 rotate-135" />
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
