import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ShieldCheck, Sparkles, Navigation, Truck, Heart } from 'lucide-react';

export default function AboutView() {
  const localDeliveryZones = [
    {
      title: "Sherobod markazi",
      time: "15-20 daqiqa",
      fee: "5,000 Sōm (bepul yetkazish imkoni)",
      desc: "Markaziy hududlar va barcha mahallalarga manti va taomlarimizni tez fursatda qaynoq holatida yetkazib beramiz."
    },
    {
      title: "Yaqin tuman va qishloqlar",
      time: "25-35 daqiqa",
      fee: "Masofaga qarab kelishiladi",
      desc: "Sherobod atrofidagi yaqin qishloqlar va hududlarga kuryerlarimiz tezkorlik bilan xizmat ko'rsatadi."
    },
    {
      title: "Maxsus tadbirlar uchun",
      time: "Belgilangan vaqtda",
      fee: "Bepul yetkazish",
      desc: "To'ylar, oilaviy marosimlar va katta tadbirlar uchun oldindan buyurtma berilgan taomlarni o'z vaqtida yetkazamiz."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 font-sans">
      
      {/* Heritage Header */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 font-mono text-xs font-bold rounded-full uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Milliy an'analar davomchisi
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-950 tracking-tight leading-tight">
            "Javohir Manti" <br/>
            oilaviy oshxonasi tarixi
          </h1>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            Bizning oilaviy oshxonamiz o'z faoliyatini 2023-yilda go'zal Sherobod tumanida boshlagan edi. Qisqa fursat – 3 yil ichida biz manti tayyorlashning haqiqiy asriy va milliy an'analarini asrab-avaylagan holda, mijozlarimizning eng sevimli va ishonchli maskaniga aylanishga ulgurdik.
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            Moyli va suvli mantilarimiz o'zgacha mehr bilan pishiriladi. Har bir manti uchun faqat eng sara va halol go'sht, yangi piyoz va maxsus sarxil ziravorlar aralashmasi ishlatiladi. Yupqagina mayin xamir, sersuv to'ldirma va uning ustidagi qaynoq bug' har qanday taomsevar dillarini maftun etadi.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg text-gray-950">3 Yillik</h4>
              <p className="text-gray-500 text-xs">Pazandachilik tajribasi</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg text-gray-950">150,000 dan ortiq</h4>
              <p className="text-gray-500 text-xs">Tayyorlangan bug' mantilari</p>
            </div>
          </div>
        </div>

        {/* Process Bento Grid Photos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400" 
                alt="Javohir Manti tayyorlash" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=400" 
                alt="Qaynoq bug' mantilari" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-8">
            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400" 
                alt="An'anaviy ko'k choy" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" 
                alt="Sifatli masalliqlar" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Redesigned Delivery Info Section */}
      <section className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100/80 space-y-8">
        <div className="max-w-3xl">
          <span className="text-amber-600 font-mono text-[10px] uppercase font-bold tracking-widest">Yetkazib berish xizmati</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-950 tracking-tight mt-1">
            Sherobod bo'ylab tezkor yetkazib berish
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Biz taomlarimizni va shirin bug' mantilarimizni maxsus harorat saqlovchi termo-sumkalarda, sifati va issiqligini yo'qotmagan holda manzilingizgacha tez fursatda yetkazib beramiz.
          </p>
        </div>

        {/* Local Delivery Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localDeliveryZones.map((zone, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 space-y-4"
            >
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                {idx === 0 ? <MapPin className="w-5 h-5" /> : idx === 1 ? <Navigation className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display font-bold text-gray-950 text-base">{zone.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{zone.desc}</p>
              </div>

              <div className="pt-2 border-t border-gray-50 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Vaqt: <strong>{zone.time}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Narx: <strong>{zone.fee}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-xs text-gray-900">Termo-sumkalar</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Taomlarimiz harorati va ajoyib ta'mi yo'qolmaydi.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-xs text-gray-900">Sifat kafolati</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Sizga faqat yangi pishirilgan va eng sara masalliqlar yetkaziladi.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-xs text-gray-900">Mehmonnavozlik</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Har bir buyurtmani mehr va iliqlik bilan ulashamiz.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
