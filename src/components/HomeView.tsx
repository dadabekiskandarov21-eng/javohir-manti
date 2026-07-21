import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { Product, CartItem } from '../types';

interface HomeViewProps {
  products: Product[];
  setCurrentView: (view: any) => void;
  addToCart: (product: Product) => void;
}

export default function HomeView({ products, setCurrentView, addToCart }: HomeViewProps) {
  // Select top 3 rating products for popular display
  const popularProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-950 text-white rounded-3xl py-20 sm:py-24 px-6 sm:px-12 mx-4 sm:mx-8 lg:mx-12 mt-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1200" 
            alt="Traditional Uzbek Food background" 
            className="w-full h-full object-cover opacity-25 object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Milliy pazandachilik durdonasi
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.1] text-white"
          >
            Bug'da Tayyorlangan <br/>
            <span className="text-amber-500 relative inline-block">
              Haqiqiy Milliy Mantilar
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed"
          >
            Sheroboddagi eng lazzatli va afsonaviy milliy oshxona – haqiqiy asriy retseptlar asosida, sersuv go'sht va mayin xamirdan tayyorlanadigan, og'izda eriydigan issiq manti va shirin taomlarni buyurtma qiling!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button 
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-semibold rounded-2xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer font-sans"
              id="hero-menu-cta"
            >
              Menyuni ko'rish
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentView('about')}
              className="px-6 py-4 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 text-white font-semibold rounded-2xl transition-all cursor-pointer font-sans"
              id="hero-about-cta"
            >
              Biz haqimizda
            </button>
          </motion.div>
        </div>

        {/* Decorative Floating Card */}
        <div className="absolute bottom-6 right-6 hidden lg:block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xs text-xs space-y-1.5 font-sans">
          <p className="font-semibold text-white">🔥 Issiq yetkazib berish!</p>
          <p className="text-gray-300">Biz taomlarni maxsus termo-sumkalarda, to'g'ridan-to'g'ri pechdan chiqarib issiq holda olib boramiz.</p>
        </div>
      </section>

      {/* Popular Products Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-gray-900 tracking-tight">
              Mashhur Taomlarimiz
            </h2>
            <p className="text-gray-500 text-sm mt-1">Mijozlarimiz tomonidan eng yuqori baholangan milliy lazzatlar</p>
          </div>
          <button 
            onClick={() => setCurrentView('menu')}
            className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors group"
            id="popular-all-menu-btn"
          >
            Barcha menyular
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 food-card-shadow flex flex-col h-full group"
              id={`popular-item-${product.id}`}
            >
              {/* Product Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-amber-500/95 text-gray-950 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center gap-1 text-gray-950 text-xs font-bold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {product.rating}
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-amber-600 font-mono text-[10px] uppercase font-bold tracking-widest">{product.category}</span>
                  <h3 className="font-display font-bold text-xl text-gray-950 tracking-tight group-hover:text-amber-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider font-mono">Narxi</span>
                    <span className="font-mono text-lg font-extrabold text-gray-950">
                      {product.price.toLocaleString('uz-UZ')} Sōm
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4.5 py-2.5 bg-amber-50 hover:bg-amber-500 hover:text-white active:scale-95 text-amber-600 font-semibold rounded-xl text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    id={`add-popular-${product.id}`}
                  >
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-50/50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Nega aynan "Javohir Manti"?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Biz shunchaki taom tayyorlamaymiz, biz asriy an'analarni va yuqori sifat standartlarini har bir manti tarkibida ulashamiz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900">100% Halol Go'sht</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Ishlatiladigan barcha go'sht va dumi eng yuqori sifatli sertifikatlangan halol so'yilgan chorvadan olinadi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900">Milliy Qo'l Retsepti</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Go'sht mashinada tortilmaydi, faqat o'tkir pichoqda mayda to'g'raladi. Bu go'sht suvliligini 100% saqlaydi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900">Tezkor Va Issiq</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Termo-boxlar yordamida buyurtmalar pishishi bilanoq, 45 daqiqada stolingizgacha yetkaziladi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900">O'zgacha Mazali Qayla</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Maxsus damlangan ziravorli suzmalarimiz va achchiq qaylalarimiz taomga takrorlanmas maza beradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Kitchen Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 border border-amber-100">
          <div className="flex-1 space-y-6">
            <h3 className="font-display font-extrabold text-3xl text-gray-950 leading-tight">
              Bizning oshpazlik sirlari
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sifatli un va eng mayda to'g'ralgan go'sht manti pishirishning poydevoridir. Xamirni shunchalik nozik yoyamizki, bug' pishish davomida u yorilib ketmaydi, ichidagi xushbo'y go'sht suvi esa manti ichida to'liq saqlanib qoladi. Har bir luqmada sharbatini his qilasiz.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600" 
              alt="Manti tayyorlash jarayoni" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-semibold">Mahoratli oshpazimiz tomonidan har bir manti tugilishi</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
