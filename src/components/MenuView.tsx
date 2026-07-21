import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Clock, X, Check, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface MenuViewProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function MenuView({ products, addToCart }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // List of categories based on products + "Barchasi"
  const defaultCategories = ['Manti', 'Somsa', 'Salatlar', 'Ichimliklar'];
  const categories = [
    'Barchasi',
    ...Array.from(new Set([
      ...defaultCategories,
      ...products.map(p => p.category)
    ]))
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Barchasi' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedItemNotice(product.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight">
            Bizning Milliy Menyularimiz
          </h1>
          <p className="text-gray-500 text-sm mt-1">Har bir taom professional oshpazlarimiz tomonidan e'tibor bilan tayyorlanadi</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Taomlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-2xl text-sm transition-all focus:ring-2 focus:ring-amber-500/10 outline-none text-gray-900"
            id="menu-search-input"
          />
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === category
                ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/10'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950'
            }`}
            id={`category-tab-${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl space-y-3">
          <p className="text-gray-500 font-sans">Qidiruv bo'yicha hech qanday taom topilmadi.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('Barchasi'); }}
            className="px-4.5 py-2 bg-amber-500 text-gray-950 font-semibold text-xs rounded-xl"
            id="clear-filters-btn"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 food-card-shadow flex flex-col h-full group cursor-pointer hover:-translate-y-1 transition-all duration-300"
              id={`menu-item-${product.id}`}
            >
              {/* Product Image */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-gray-950 text-[9px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-lg flex items-center gap-1 text-gray-950 text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {product.rating}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-600 font-mono text-[9px] uppercase font-bold tracking-widest">{product.category}</span>
                  <h3 className="font-display font-bold text-lg text-gray-950 tracking-tight group-hover:text-amber-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider font-mono">Narxi</span>
                    <span className="font-mono text-base font-extrabold text-gray-950">
                      {product.price.toLocaleString('uz-UZ')} Sōm
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedItemNotice === product.id 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-50 text-gray-700 hover:bg-amber-500 hover:text-white group-hover:bg-amber-500 group-hover:text-white'
                    }`}
                    id={`add-menu-${product.id}`}
                  >
                    {addedItemNotice === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Qo'shildi!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Qo'shish
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs"
              id="modal-overlay"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col font-sans border border-gray-100"
              id="menu-item-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow-md cursor-pointer"
                id="close-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Image Header */}
              <div className="relative h-64 sm:h-72">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/25 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/90 text-gray-950 text-[9px] font-bold uppercase tracking-wider font-mono">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl tracking-tight leading-tight">
                    {selectedProduct.name}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl text-xs font-semibold">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4.5 h-4.5 text-amber-500" />
                    <span>Tayyorlanishi: {selectedProduct.prepareTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                    <span>Reyting: {selectedProduct.rating} / 5.0</span>
                  </div>
                </div>

                {/* Additional Cooking Guarantee info */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-400 font-mono tracking-wider">Kafolat</h4>
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3px]" />
                    </div>
                    <span>Yangi so'yilgan sarxil go'shtdan maxsus qo'lda kesib tayyorlangan</span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider font-mono">Umumiy Narxi</span>
                    <span className="font-mono text-xl font-extrabold text-gray-950">
                      {selectedProduct.price.toLocaleString('uz-UZ')} Sōm
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                    id="modal-add-to-cart-btn"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
