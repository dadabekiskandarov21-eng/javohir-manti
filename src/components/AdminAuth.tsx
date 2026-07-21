import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, User, Eye, EyeOff, UserPlus, ArrowRight, Sparkles, CheckCircle, AlertCircle, Home, Key } from 'lucide-react';

interface AdminAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminAuth({ onSuccess, onCancel }: AdminAuthProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Preseed a default admin user if none exists in localStorage
  useEffect(() => {
    const savedAdmins = localStorage.getItem('jm_admins');
    if (!savedAdmins) {
      const defaultAdmins = [{ username: 'admin', password: 'admin' }];
      localStorage.setItem('jm_admins', JSON.stringify(defaultAdmins));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    const savedAdmins = localStorage.getItem('jm_admins');
    const admins = savedAdmins ? JSON.parse(savedAdmins) : [{ username: 'admin', password: 'admin' }];

    const user = admins.find(
      (a: any) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password
    );

    if (user) {
      setSuccess("Tizimga muvaffaqiyatli kirildi! Yo'naltirilmoqda...");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setError("Login yoki parol noto'g'ri. Iltimos, qayta urinib ko'ring.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username.trim() || !password || !confirmPassword || !secretCode) {
      setError("Barcha maydonlarni to'ldirish majburiy");
      return;
    }

    if (username.trim().length < 4) {
      setError("Login kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (password.length < 5) {
      setError("Parol kamida 5 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi");
      return;
    }

    // Security Secret code validation to make it secure from public
    // Let's accept 'JAVOHIR' or 'JAVOHIR2026' or 'MANTI' (case insensitive)
    const validCodes = ['javohir', 'javohir2026', 'manti', 'admin'];
    if (!validCodes.includes(secretCode.trim().toLowerCase())) {
      setError("Xavfsizlik kodi noto'g'ri! (Hushyor bo'ling: kod 'JAVOHIR2026')");
      return;
    }

    const savedAdmins = localStorage.getItem('jm_admins');
    const admins = savedAdmins ? JSON.parse(savedAdmins) : [{ username: 'admin', password: 'admin' }];

    const userExists = admins.some(
      (a: any) => a.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (userExists) {
      setError("Ushbu login band. Boshqa login kiriting.");
      return;
    }

    // Register user
    const newAdmin = { username: username.trim(), password };
    const updatedAdmins = [...admins, newAdmin];
    localStorage.setItem('jm_admins', JSON.stringify(updatedAdmins));

    setSuccess("Siz muvaffaqiyatli ro'yxatdan o'tdingiz! Endi tizimga kiring.");
    
    // Switch to login tab and prefill username
    setTimeout(() => {
      setActiveTab('login');
      setPassword('');
      setConfirmPassword('');
      setSecretCode('');
      setSuccess(null);
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-radial from-gray-50 to-gray-100/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden"
      >
        {/* Banner/Header */}
        <div className="bg-gray-950 text-white px-8 py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-gray-950 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl tracking-tight">Admin Tizimi</h1>
              <p className="text-gray-400 text-xs font-mono">Xavfsiz boshqaruv paneli</p>
            </div>
          </div>
        </div>

        {/* Auth Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => {
              setActiveTab('login');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-4 text-center font-sans text-xs font-bold uppercase tracking-wider relative transition-colors ${
              activeTab === 'login' ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Kirish
            {activeTab === 'login' && (
              <motion.span 
                layoutId="auth-tab-line"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" 
              />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-4 text-center font-sans text-xs font-bold uppercase tracking-wider relative transition-colors ${
              activeTab === 'register' ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Ro'yxatdan o'tish
            {activeTab === 'register' && (
              <motion.span 
                layoutId="auth-tab-line"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" 
              />
            )}
          </button>
        </div>

        {/* Content area */}
        <div className="p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl flex items-start gap-2.5 font-sans"
            >
              <AlertCircle className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-xl flex items-start gap-2.5 font-sans"
            >
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </motion.div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" /> Username / Login
                </label>
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-gray-400" /> Parol
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                Tizimga Kirish
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-gray-400">
                  Sinov uchun standart ma'lumotlar: <span className="font-mono font-bold text-gray-600">admin</span> / <span className="font-mono font-bold text-gray-600">admin</span>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" /> Yangi Login / Username
                </label>
                <input
                  type="text"
                  placeholder="Kamida 4 ta belgi..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-gray-400" /> Parol o'rnatish
                </label>
                <input
                  type="password"
                  placeholder="Kamida 5 ta belgi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-gray-400" /> Parolni tasdiqlash
                </label>
                <input
                  type="password"
                  placeholder="Qayta kiriting..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5 p-3.5 bg-amber-50/20 border border-amber-500/10 rounded-2xl">
                <label className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-500" /> Xavfsizlik kodi (Admin Secret)
                </label>
                <input
                  type="text"
                  placeholder="Ro'yxatdan o'tish kodi..."
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-amber-500 rounded-lg text-xs transition-all outline-none font-mono"
                  required
                />
                <span className="text-[9px] text-gray-400 leading-relaxed block mt-1">
                  * Faqat vakolatli adminlar uchun. Sinov xavfsizlik kodi: <span className="font-mono font-bold text-amber-600">JAVOHIR2026</span>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-950 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                <UserPlus className="w-4 h-4" />
                Ro'yxatdan o'tish
              </button>
            </form>
          )}

          {/* Go Back to Home */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex justify-center">
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
