import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusCircle, Trash2, Search, X, Check, Eye, Tag, Sparkles, Pencil, Upload, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface AdminProductsProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const PRESET_IMAGES = [
  { name: "Manti (Bug'da)", url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400" },
  { name: "Manti (Qovurdoq)", url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400" },
  { name: "Tandir Somsa", url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=400" },
  { name: "Samsa (Tovuqli)", url: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400" },
  { name: "Achchiq-chuchuk", url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400" },
  { name: "Ko'k Choy", url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400" }
];

export default function AdminProducts({ products, addProduct, updateProduct, deleteProduct }: AdminProductsProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // New product form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Manti');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState<number>(15000);
  const [prepareTime, setPrepareTime] = useState('20 daqiqa');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [tagsInput, setTagsInput] = useState('Issiq, Milliy');
  const [customImageURL, setCustomImageURL] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Dynamic unique categories list
  const defaultCategories = ['Manti', 'Somsa', 'Salatlar', 'Ichimliklar'];
  const uniqueCategories = Array.from(new Set([
    ...defaultCategories,
    ...products.map(p => p.category)
  ]));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // 3MB limit
        setValidationError("Rasm hajmi juda katta (maksimal 3MB bo'lishi kerak)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomImageURL(base64String);
        setImage(''); // Clear preset selection
        setValidationError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Barchasi' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setCategory('Manti');
    setIsCustomCategory(false);
    setCustomCategory('');
    setPrice(15000);
    setPrepareTime('20 daqiqa');
    setImage(PRESET_IMAGES[0].url);
    setCustomImageURL('');
    setTagsInput('Issiq, Milliy');
    setValidationError(null);
    setFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setIsCustomCategory(false);
    setCustomCategory('');
    setPrice(product.price);
    setPrepareTime(product.prepareTime);
    
    // Check if preset image matches
    const isPreset = PRESET_IMAGES.some(p => p.url === product.image);
    if (isPreset) {
      setImage(product.image);
      setCustomImageURL('');
    } else {
      setImage('');
      setCustomImageURL(product.image);
    }
    
    setTagsInput(product.tags.join(', '));
    setValidationError(null);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError("Nomi maydonini to'ldiring.");
      return;
    }

    const finalCategory = isCustomCategory ? customCategory.trim() : category;
    if (!finalCategory) {
      setValidationError("Kategoriya maydonini to'ldiring yoki tanlang.");
      return;
    }

    if (price <= 0) {
      setValidationError("Narxni to'g'ri kiriting.");
      return;
    }

    // Process tags
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const finalImage = customImageURL.trim() ? customImageURL.trim() : image;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        description,
        category: finalCategory,
        price: Number(price),
        prepareTime,
        image: finalImage,
        tags
      });
    } else {
      addProduct({
        id: String(Date.now()),
        name,
        description,
        category: finalCategory,
        price: Number(price),
        prepareTime,
        image: finalImage,
        tags
      });
    }

    // Reset fields & Close form
    setName('');
    setDescription('');
    setCategory('Manti');
    setIsCustomCategory(false);
    setCustomCategory('');
    setPrice(15000);
    setPrepareTime('20 daqiqa');
    setImage(PRESET_IMAGES[0].url);
    setCustomImageURL('');
    setTagsInput('Issiq, Milliy');
    setEditingProduct(null);
    setFormOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Top action and header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-gray-950 tracking-tight">
            Taomlarni boshqarish
          </h1>
          <p className="text-gray-500 text-sm mt-1">Oshxonangiz menyusidagi taomlar ro'yxati va yangilarini qo'shish paneli</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold rounded-2xl transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          id="admin-open-add-product-btn"
        >
          <PlusCircle className="w-5 h-5" />
          Yangi taom qo'shish
        </button>
      </div>

      {/* Filter and Search Products */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Taomlarni nomi bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-2xl text-sm transition-all focus:ring-1 focus:ring-amber-500/10 outline-none text-gray-900"
            id="admin-product-search"
          />
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['Barchasi', ...uniqueCategories].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/10'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 border border-gray-100/50'
              }`}
            >
              {cat === 'Barchasi' ? 'Taomlar hammasi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products list Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-600">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                <th className="py-4 px-6">Rasm</th>
                <th className="py-4 px-6">Taom Nomi</th>
                <th className="py-4 px-6">Kategoriya</th>
                <th className="py-4 px-6">Narxi</th>
                <th className="py-4 px-6">Tayyorlash vaqti</th>
                <th className="py-4 px-6 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-gray-950 text-sm font-bold">{product.name}</p>
                      <p className="text-gray-400 text-[10px] truncate max-w-xs">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium">{product.category}</td>
                  <td className="py-4 px-6 font-mono text-gray-950 font-bold">
                    {product.price.toLocaleString('uz-UZ')} Sōm
                  </td>
                  <td className="py-4 px-6 text-gray-500">{product.prepareTime}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-gray-400 hover:text-amber-500 p-2 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer inline-flex"
                      title="Taomni tahrirlash"
                      id={`edit-prod-btn-${product.id}`}
                    >
                      <Pencil className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-gray-400 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer inline-flex"
                      title="Taomni o'chirish"
                      id={`delete-prod-btn-${product.id}`}
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Add Product Modal Overlay */}
      <AnimatePresence>
        {formOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormOpen(false)}
              className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs"
              id="form-overlay"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl z-10 flex flex-col font-sans max-h-[90vh] overflow-y-auto border border-gray-100"
              id="add-product-form-box"
            >
              {/* Close Button */}
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-950 cursor-pointer"
                id="close-form-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  {editingProduct ? "Tahrirlash" : "Yangi mahsulot"}
                </div>
                <h2 className="font-display font-extrabold text-2xl text-gray-950 tracking-tight">
                  {editingProduct ? "Taomni Tahrirlash" : "Yangi Taom Qo'shish"}
                </h2>
                <p className="text-gray-500 text-xs">
                  {editingProduct ? "Tanlangan taom ma'lumotlarini o'zgartiring" : "Mijozlar menyusida paydo bo'ladigan taom ma'lumotlarini kiriting"}
                </p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400 font-mono">Taom Nomi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Tandir Somsa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase text-gray-400 font-mono">Kategoriya *</label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(!isCustomCategory);
                          if (!isCustomCategory) {
                            setCustomCategory('');
                          }
                        }}
                        className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                      >
                        {isCustomCategory ? "Mavjudlaridan tanlash" : "+ Yangi kategoriya qo'shish"}
                      </button>
                    </div>

                    {isCustomCategory ? (
                      <motion.input
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        type="text"
                        required
                        placeholder="Masalan: Sho'rvalar, Desertlar"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                      />
                    ) : (
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                      >
                        {uniqueCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-400 font-mono">Tavsif (Ixtiyoriy)</label>
                  <textarea
                    placeholder="Tarkibi, xususiyatlari va pishirilish usuli..."
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400 font-mono">Narxi (Sōm) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400 font-mono">Tayyorlanish vaqti</label>
                    <input
                      type="text"
                      placeholder="25-30 daqiqa"
                      value={prepareTime}
                      onChange={(e) => setPrepareTime(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                    />
                  </div>
                </div>                {/* Preset Image Selector & File Upload */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-gray-400 font-mono block">Rasm tanlash yoki yuklash</label>
                  
                  {/* Preset images thumbnails */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">Tayyor rasmlardan tanlash</span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setImage(preset.url);
                            setCustomImageURL('');
                          }}
                          className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all relative ${
                            image === preset.url && !customImageURL
                              ? 'border-amber-500 scale-102 shadow-xs'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          title={preset.name}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                          {image === preset.url && !customImageURL && (
                            <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center text-amber-600">
                              <Check className="w-4 h-4 stroke-[3px]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device upload & URL inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* File selector box */}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-amber-500 rounded-xl p-3 cursor-pointer hover:bg-amber-50/10 transition-colors text-center group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-amber-500 mb-1" />
                      <span className="text-[11px] font-bold text-gray-700 group-hover:text-amber-600 block">Kompyuter / Telefondan yuklash</span>
                      <span className="text-[9px] text-gray-400 block mt-0.5">Faylni tanlash (PNG, JPG, WebP)</span>
                    </label>

                    {/* URL Input */}
                    <div className="flex flex-col justify-center space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Yoki rasm URL manzilini kiritish</span>
                      <input
                        type="url"
                        placeholder="https://example.com/rasm.jpg"
                        value={customImageURL.startsWith('data:') ? '' : customImageURL}
                        onChange={(e) => {
                          setCustomImageURL(e.target.value);
                          setImage('');
                        }}
                        className="w-full px-3 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs transition-all outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Active Preview block */}
                  {(customImageURL || image) && (
                    <div className="flex items-center gap-3 p-3 bg-amber-50/20 border border-amber-500/10 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                        <img 
                          src={customImageURL || image} 
                          alt="Tanlangan rasm" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100";
                          }}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider font-mono block">Faol rasm ko'rinishi</span>
                        <p className="text-xs text-gray-800 font-bold truncate">
                          {customImageURL.startsWith('data:') ? 'Yuklangan rasm (Fayl)' : (customImageURL ? 'Kiritilgan URL manzili' : 'Tanlangan tayyor rasm')}
                        </p>
                      </div>
                      {customImageURL && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomImageURL('');
                            setImage(PRESET_IMAGES[0].url);
                          }}
                          className="p-1.5 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors cursor-pointer"
                          title="Rasm yuklashni bekor qilish"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-400 font-mono">Belgilar / Tags (Vergullar bilan ajrating)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs transition-all outline-none"
                  />
                </div>

                {validationError && (
                  <div className="text-rose-600 text-xs font-semibold py-1">
                    ⚠️ {validationError}
                  </div>
                )}

                {/* Footer Submit */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-5 py-3 text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
                    id="submit-new-product-btn"
                  >
                    {editingProduct ? "O'zgartirishni saqlash" : "Qo'shishni tasdiqlash"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
