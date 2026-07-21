import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, DollarSign, ShoppingBag, Users, Calendar, ArrowRight, 
  Eye, AlertCircle, X, CheckCircle2, XCircle, Clock, Truck, CreditCard, Layers, Tag
} from 'lucide-react';
import { Order, Product, OrderStatus } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  setCurrentView: (view: any) => void;
}

const mockSalesByDay: { [key: string]: { id: string; name: string; date: string; items: string; total: number; paymentMethod: string }[] } = {
  "Dush": [
    { id: "JM-1021", name: "Alisher Qodirov", date: "Dushanba, 11:30", items: "Javohir Manti (x10), Somsa (x15)", total: 650000, paymentMethod: "click" },
    { id: "JM-1022", name: "Malika Sobirova", date: "Dushanba, 13:15", items: "Lag'mon (x5), Qo'y go'shtli manti (x12)", total: 580000, paymentMethod: "payme" },
    { id: "JM-1023", name: "Sardor Olimov", date: "Dushanba, 19:40", items: "Manti patnis (x1), Coca-Cola 1.5L (x4)", total: 570000, paymentMethod: "cash" }
  ],
  "Sesh": [
    { id: "JM-1031", name: "Bobur Rahmonov", date: "Seshanba, 12:00", items: "Manti patnis (x2), Choy (x5)", total: 980000, paymentMethod: "click" },
    { id: "JM-1032", name: "Nargiza Ismoilova", date: "Seshanba, 14:30", items: "Qo'y go'shtli manti (x20)", total: 800000, paymentMethod: "payme" },
    { id: "JM-1033", name: "Jasur Hamidov", date: "Seshanba, 20:10", items: "Somsa (x20), Fanta 1.5L (x3)", total: 620000, paymentMethod: "cash" }
  ],
  "Chor": [
    { id: "JM-1041", name: "Zuhra To'rayeva", date: "Chorshanba, 11:45", items: "Lag'mon (x8), Chuchvara (x4)", total: 720000, paymentMethod: "payme" },
    { id: "JM-1042", name: "Farrux Tashkentov", date: "Chorshanba, 13:00", items: "Manti aralash (x24), Limonli choy (x6)", total: 1080000, paymentMethod: "click" },
    { id: "JM-1043", name: "Umida G'ofurova", date: "Chorshanba, 18:30", items: "Qovurma manti (x10)", total: 300000, paymentMethod: "cash" }
  ],
  "Pay": [
    { id: "JM-1051", name: "Dilshod Tojiyev", date: "Payshanba, 12:15", items: "Javohir Manti maxsus patnis (x2)", total: 1200000, paymentMethod: "click" },
    { id: "JM-1052", name: "Shahnoza Ergasheva", date: "Payshanba, 15:00", items: "Tovuqli manti (x30), Sprite 1.5L (x5)", total: 1100000, paymentMethod: "payme" },
    { id: "JM-1053", name: "Otabek Madaminov", date: "Payshanba, 19:15", items: "Somsa go'shtli (x26)", total: 800000, paymentMethod: "cash" }
  ],
  "Jum": [
    { id: "JM-1061", name: "Muzaffar Karimov", date: "Juma, 13:30", items: "Javohir Manti (x40), Ko'za sho'rva (x10)", total: 1950000, paymentMethod: "click" },
    { id: "JM-1062", name: "Diyora Rustamova", date: "Juma, 16:45", items: "Manti bayramona (x3 patnis)", total: 1650000, paymentMethod: "payme" },
    { id: "JM-1063", name: "Elyor G'aniyev", date: "Juma, 20:30", items: "Qovurma Lag'mon (x15), Choy (x10)", total: 900000, paymentMethod: "cash" }
  ],
  "Shan": [
    { id: "JM-1071", name: "Roxatbek Xasanov", date: "Shanba, 13:00", items: "Manti patnis oila (x4), Mevali sharbatlar (x10)", total: 2400000, paymentMethod: "payme" },
    { id: "JM-1072", name: "Kamola Umarova", date: "Shanba, 17:30", items: "Tandir Somsa (x40), Coca-Cola 1.5L (x8)", total: 1600000, paymentMethod: "click" },
    { id: "JM-1073", name: "Davron Salimov", date: "Shanba, 21:00", items: "Qo'y go'shtli manti (x30)", total: 1200000, paymentMethod: "cash" }
  ],
  "Yak": [
    { id: "JM-1081", name: "Doston Yo'ldoshev", date: "Yakshanba, 12:40", items: "Javohir Manti (x20), Ko'za sho'rva (x4)", total: 1800000, paymentMethod: "payme" },
    { id: "JM-1082", name: "Zilola Axmedova", date: "Yakshanba, 15:15", items: "Manti aralash (x30), Tandir Somsa (x10)", total: 1800000, paymentMethod: "click" },
    { id: "JM-1083", name: "Kozimxo'ja Saidaliev", date: "Yakshanba, 19:30", items: "Qovurma Lag'mon (x8), Mevali choy (x4)", total: 1200000, paymentMethod: "cash" }
  ]
};

export default function AdminDashboard({ orders, products, setCurrentView }: AdminDashboardProps) {
  const [selectedStat, setSelectedStat] = React.useState<'sales' | 'active_orders' | 'all_orders' | 'menu_items' | null>(null);
  const [selectedSalesDayFilter, setSelectedSalesDayFilter] = React.useState<string | null>(null);

  // Calculate dynamic stats
  const totalSales = orders
    .filter(o => o.status === 'delivered') // only count delivered orders for actual sales
    .reduce((acc, o) => acc + o.total, 0);

  const pendingSales = orders
    .filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const activeOrdersCount = orders
    .filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way')
    .length;

  const totalOrdersCount = orders.length;

  // Let's take the latest 3 orders for display
  const recentOrders = [...orders].reverse().slice(0, 3);

  // Simple dataset for SVG sales line chart
  const weeklySalesData = [
    { day: "Dush", value: 1800000 },
    { day: "Sesh", value: 2400000 },
    { day: "Chor", value: 2100000 },
    { day: "Pay", value: 3100000 },
    { day: "Jum", value: 4500000 },
    { day: "Shan", value: 5200000 },
    { day: "Yak", value: totalSales > 0 ? Math.min(totalSales, 6500000) : 4800000 }
  ];

  const maxVal = Math.max(...weeklySalesData.map(d => d.value));

  // Category statistics helper
  const productsByCategory = products.reduce((acc: { [key: string]: Product[] }, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Payment methods breakdown
  const paymentBreakdown = orders
    .filter(o => o.status === 'delivered')
    .reduce((acc, o) => {
      acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + o.total;
      return acc;
    }, { cash: 0, click: 0, payme: 0 });

  // Helper to calculate filtered daily sales or total week stats
  const getFilteredSalesAndBreakdown = () => {
    if (selectedSalesDayFilter === null) {
      const list = orders.filter(o => o.status === 'delivered').map(o => ({
        id: o.id,
        name: o.name,
        date: o.date,
        items: o.items.map(item => `${item.product.name} (x${item.quantity})`).join(', '),
        total: o.total,
        paymentMethod: o.paymentMethod
      }));

      // Fallback if no real sales exist yet, so we have a beautiful dashboard
      const hasRealSales = list.length > 0;
      const displayList = hasRealSales ? list : [
        ...mockSalesByDay["Dush"],
        ...mockSalesByDay["Sesh"],
        ...mockSalesByDay["Chor"],
        ...mockSalesByDay["Pay"],
        ...mockSalesByDay["Jum"],
        ...mockSalesByDay["Shan"],
        ...mockSalesByDay["Yak"]
      ];

      const sumTotal = hasRealSales ? totalSales : displayList.reduce((acc, o) => acc + o.total, 0);
      const clickSum = hasRealSales ? paymentBreakdown.click : displayList.filter(o => o.paymentMethod === 'click').reduce((acc, o) => acc + o.total, 0);
      const paymeSum = hasRealSales ? paymentBreakdown.payme : displayList.filter(o => o.paymentMethod === 'payme').reduce((acc, o) => acc + o.total, 0);
      const cashSum = hasRealSales ? paymentBreakdown.cash : displayList.filter(o => o.paymentMethod === 'cash').reduce((acc, o) => acc + o.total, 0);

      return {
        list: displayList,
        total: sumTotal,
        click: clickSum,
        payme: paymeSum,
        cash: cashSum,
        count: displayList.length,
        label: "Barcha muvaffaqiyatli savdolar (Jami)",
        isMocked: !hasRealSales
      };
    } else {
      const dayName = selectedSalesDayFilter;
      let list = mockSalesByDay[dayName] || [];
      if (dayName === 'Yak') {
        const realDelivered = orders.filter(o => o.status === 'delivered');
        if (realDelivered.length > 0) {
          list = realDelivered.map(o => ({
            id: o.id,
            name: o.name,
            date: `Yakshanba, ${o.date.split(',')[1] || o.date}`,
            items: o.items.map(i => `${i.product.name} (x${i.quantity})`).join(', '),
            total: o.total,
            paymentMethod: o.paymentMethod
          }));
        }
      }

      const dayTotal = list.reduce((sum, item) => sum + item.total, 0);
      const click = list.filter(item => item.paymentMethod === 'click').reduce((sum, item) => sum + item.total, 0);
      const payme = list.filter(item => item.paymentMethod === 'payme').reduce((sum, item) => sum + item.total, 0);
      const cash = list.filter(item => item.paymentMethod === 'cash').reduce((sum, item) => sum + item.total, 0);

      const dayNamesMap: { [key: string]: string } = {
        'Dush': 'Dushanba',
        'Sesh': 'Seshanba',
        'Chor': 'Chorshanba',
        'Pay': 'Payshanba',
        'Jum': 'Juma',
        'Shan': 'Shanba',
        'Yak': 'Yakshanba'
      };

      return {
        list,
        total: dayTotal,
        click,
        payme,
        cash,
        count: list.length,
        label: `${dayNamesMap[dayName] || dayName} kunidagi savdolar`,
        isMocked: true // Specific days utilize mock history to be fully populated
      };
    }
  };

  const salesInfo = getFilteredSalesAndBreakdown();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Title Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-gray-900 tracking-tight">
            Tizim Boshqaruv Paneli
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sotuvlar va faol buyurtmalarning real vaqtdagi hisoboti</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>Bugun: {new Date().toLocaleDateString('uz-UZ')}</span>
        </div>
      </div>

      {/* KPI Stats Cards - Now Clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Total Sales */}
        <div 
          onClick={() => setSelectedStat('sales')}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all group"
          id="kpi-sales"
          title="Batafsil ma'lumot olish uchun bosing"
        >
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block group-hover:text-amber-500 transition-colors">Jami Savdo</span>
            <p className="font-mono font-extrabold text-xl text-gray-950">
              {totalSales.toLocaleString('uz-UZ')} Sōm
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Faqat yetkazilganlar
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Active Orders */}
        <div 
          onClick={() => setSelectedStat('active_orders')}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md hover:scale-[1.02] transition-all group"
          id="kpi-active"
          title="Batafsil ma'lumot olish uchun bosing"
        >
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block group-hover:text-blue-500 transition-colors">Faol Buyurtmalar</span>
            <p className="font-mono font-extrabold text-xl text-gray-950">
              {activeOrdersCount} ta faol
            </p>
            <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Tayyorlanish jarayonida
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Total Orders */}
        <div 
          onClick={() => setSelectedStat('all_orders')}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-400 hover:shadow-md hover:scale-[1.02] transition-all group"
          id="kpi-total"
          title="Batafsil ma'lumot olish uchun bosing"
        >
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block group-hover:text-emerald-500 transition-colors">Barcha Buyurtmalar</span>
            <p className="font-mono font-extrabold text-xl text-gray-950">
              {totalOrdersCount} ta jami
            </p>
            <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3" /> Umumiy buyurtmalar tarixi
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Menu Items Count */}
        <div 
          onClick={() => setSelectedStat('menu_items')}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-purple-400 hover:shadow-md hover:scale-[1.02] transition-all group"
          id="kpi-menu"
          title="Batafsil ma'lumot olish uchun bosing"
        >
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block group-hover:text-purple-500 transition-colors">Menyudagi Taomlar</span>
            <p className="font-mono font-extrabold text-xl text-gray-950">
              {products.length} xil taom
            </p>
            <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3" /> Kategoriyalar bo'yicha
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <Users className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Sales Dynamic Line Chart */}
      <section 
        onClick={() => {
          setSelectedStat('sales');
          setSelectedSalesDayFilter(null);
        }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6 cursor-pointer hover:border-amber-400 hover:shadow-md hover:scale-[1.01] transition-all group/chart"
        title="Kunlik savdolarni batafsil tahlil qilish uchun bosing"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-50">
          <div>
            <h3 className="font-display font-bold text-base text-gray-900 group-hover/chart:text-amber-500 transition-colors">Haftalik Savdo Dinamikasi</h3>
            <p className="text-gray-500 text-xs">Kunlik daromad grafigi (batafsil savdo ro'yxatini ko'rish uchun bosing)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
              Sōm hisobida
            </span>
            <span className="text-[10px] font-sans text-amber-600 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1 group-hover/chart:bg-amber-500 group-hover/chart:text-white transition-all">
              Batafsil <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Visual Line Chart via customized clean SVG vector */}
        <div className="h-64 sm:h-80 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="50" y1="50" x2="650" y2="50" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="125" x2="650" y2="125" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="200" x2="650" y2="200" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="275" x2="650" y2="275" stroke="#e5e7eb" strokeWidth="1" />

            {/* Gradient Area under curve */}
            <path
              d={`M 50 275 L 50 ${275 - (weeklySalesData[0].value / maxVal) * 200} 
                  L 150 ${275 - (weeklySalesData[1].value / maxVal) * 200} 
                  L 250 ${275 - (weeklySalesData[2].value / maxVal) * 200} 
                  L 350 ${275 - (weeklySalesData[3].value / maxVal) * 200} 
                  L 450 ${275 - (weeklySalesData[4].value / maxVal) * 200} 
                  L 550 ${275 - (weeklySalesData[5].value / maxVal) * 200} 
                  L 650 ${275 - (weeklySalesData[6].value / maxVal) * 200} 
                  L 650 275 Z`}
              fill="url(#chartGradient)"
            />

            {/* Main Line path */}
            <path
              d={`M 50 ${275 - (weeklySalesData[0].value / maxVal) * 200} 
                  L 150 ${275 - (weeklySalesData[1].value / maxVal) * 200} 
                  L 250 ${275 - (weeklySalesData[2].value / maxVal) * 200} 
                  L 350 ${275 - (weeklySalesData[3].value / maxVal) * 200} 
                  L 450 ${275 - (weeklySalesData[4].value / maxVal) * 200} 
                  L 550 ${275 - (weeklySalesData[5].value / maxVal) * 200} 
                  L 650 ${275 - (weeklySalesData[6].value / maxVal) * 200}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Interactive Nodes Points */}
            {weeklySalesData.map((data, idx) => {
              const cx = 50 + idx * 100;
              const cy = 275 - (data.value / maxVal) * 200;
              return (
                <g 
                  key={idx} 
                  className="group/node cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStat('sales');
                    setSelectedSalesDayFilter(data.day);
                  }}
                  id={`chart-node-${idx}`}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#ffffff"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    className="transition-all duration-200 group-hover/node:r-[8px] group-hover/node:stroke-amber-600"
                  />
                  <text
                    x={cx}
                    y={cy - 12}
                    fontSize="9"
                    fontWeight="bold"
                    fill="#030712"
                    textAnchor="middle"
                    className="opacity-0 group-hover/node:opacity-100 transition-opacity bg-white px-1 font-mono"
                  >
                    {(data.value / 1000).toLocaleString('uz-UZ')}k
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* X axis labels */}
          <div className="flex justify-between px-[50px] text-[10px] font-bold uppercase text-gray-400 font-mono pt-2">
            {weeklySalesData.map((d, i) => (
              <span 
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStat('sales');
                  setSelectedSalesDayFilter(d.day);
                }}
                className="hover:text-amber-500 cursor-pointer p-1 rounded transition-colors"
              >
                {d.day}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders List */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <div>
            <h3 className="font-display font-bold text-base text-gray-900">Yaqindagi buyurtmalar</h3>
            <p className="text-gray-500 text-xs">Oxirgi qabul qilingan xaridlar ro'yxati</p>
          </div>
          <button
            onClick={() => setCurrentView('admin-orders')}
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-xs font-semibold group transition-all"
            id="dash-all-orders-btn"
          >
            Barchasini ko'rish
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-600 font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-mono uppercase tracking-wider pb-3">
                <th className="py-3 px-4">Buyurtma ID</th>
                <th className="py-3 px-4">Mijoz Ismi</th>
                <th className="py-3 px-4">Sana / Vaqt</th>
                <th className="py-3 px-4">Umumiy summa</th>
                <th className="py-3 px-4">To'lov turi</th>
                <th className="py-3 px-4">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-900">{order.name}</td>
                  <td className="py-3 px-4 text-gray-500 font-medium">{order.date}</td>
                  <td className="py-3 px-4 font-mono text-gray-900 font-bold">
                    {order.total.toLocaleString('uz-UZ')} Sōm
                  </td>
                  <td className="py-3 px-4 uppercase text-[10px] text-gray-500">{order.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'pending' && 'bg-amber-50 text-amber-600 border border-amber-100'
                    } ${
                      order.status === 'preparing' && 'bg-blue-50 text-blue-600 border border-blue-100'
                    } ${
                      order.status === 'on_the_way' && 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    } ${
                      order.status === 'delivered' && 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    } ${
                      order.status === 'cancelled' && 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {order.status === 'pending' && 'Kutilmoqda'}
                      {order.status === 'preparing' && 'Tayyorlanmoqda'}
                      {order.status === 'on_the_way' && "Kuryer yo'lda"}
                      {order.status === 'delivered' && 'Yetkazildi'}
                      {order.status === 'cancelled' && 'Bekor qilindi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ANCHOR: Stat Modal details display */}
      <AnimatePresence>
        {selectedStat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStat(null)}
              className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedStat === 'sales' ? 'bg-amber-100 text-amber-600' :
                    selectedStat === 'active_orders' ? 'bg-blue-100 text-blue-600' :
                    selectedStat === 'all_orders' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {selectedStat === 'sales' && <DollarSign className="w-5 h-5" />}
                    {selectedStat === 'active_orders' && <ShoppingBag className="w-5 h-5" />}
                    {selectedStat === 'all_orders' && <TrendingUp className="w-5 h-5" />}
                    {selectedStat === 'menu_items' && <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-lg text-gray-900 leading-tight">
                      {selectedStat === 'sales' && 'Savdo Hisoboti va Daromad'}
                      {selectedStat === 'active_orders' && 'Faol Buyurtmalar Tafsiloti'}
                      {selectedStat === 'all_orders' && 'Barcha Buyurtmalar Statistikasi'}
                      {selectedStat === 'menu_items' && 'Menyudagi Taomlar va Kategoriyalar'}
                    </h2>
                    <p className="text-gray-400 text-xs font-mono font-bold uppercase mt-0.5">
                      {selectedStat === 'sales' && 'Moliya va to\'lovlar breakdowni'}
                      {selectedStat === 'active_orders' && 'Jarayondagi buyurtmalar holati'}
                      {selectedStat === 'all_orders' && 'Barcha holatdagi buyurtmalar tarixi'}
                      {selectedStat === 'menu_items' && 'Mavjud taomlar va guruhlar'}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedStat(null)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Content (Scrollable) */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                 {/* 1. SALES MODAL */}
                {selectedStat === 'sales' && (
                  <div className="space-y-6">
                    {/* Days Selector Switcher Tabs */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Kunlik savdolarni ko'rish:</p>
                      <div className="flex flex-wrap gap-1.5 pb-1">
                        <button
                          onClick={() => setSelectedSalesDayFilter(null)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer ${
                            selectedSalesDayFilter === null
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Barchasi (Jami)
                        </button>
                        {['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'].map((day) => {
                          const isSelected = selectedSalesDayFilter === day;
                          const dayNameFull = 
                            day === 'Dush' ? 'Dush' :
                            day === 'Sesh' ? 'Sesh' :
                            day === 'Chor' ? 'Chor' :
                            day === 'Pay' ? 'Pay' :
                            day === 'Jum' ? 'Jum' :
                            day === 'Shan' ? 'Shan' : 'Yak';
                          const dayNamesLabelMap: { [key: string]: string } = {
                            'Dush': 'Dushanba',
                            'Sesh': 'Seshanba',
                            'Chor': 'Chorshanba',
                            'Pay': 'Payshanba',
                            'Jum': 'Juma',
                            'Shan': 'Shanba',
                            'Yak': 'Yakshanba'
                          };
                          return (
                            <button
                              key={day}
                              onClick={() => setSelectedSalesDayFilter(day)}
                              title={dayNamesLabelMap[day]}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {dayNamesLabelMap[day]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Visual Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 text-center space-y-1">
                        <span className="text-[10px] text-amber-600 font-mono font-bold uppercase">
                          {selectedSalesDayFilter === null ? "Yig'ilgan Daromad" : "Kunlik Daromad"}
                        </span>
                        <p className="text-lg font-mono font-extrabold text-amber-950">
                          {salesInfo.total.toLocaleString('uz-UZ')} Sōm
                        </p>
                        <span className="text-[9px] text-gray-400 block font-sans">
                          {selectedSalesDayFilter === null ? "Yetkazilgan buyurtmalardan" : "Muvaffaqiyatli savdolar summasi"}
                        </span>
                      </div>
                      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 text-center space-y-1">
                        <span className="text-[10px] text-blue-600 font-mono font-bold uppercase">Buyurtmalar Soni</span>
                        <p className="text-lg font-mono font-extrabold text-blue-950">
                          {salesInfo.count} ta
                        </p>
                        <span className="text-[9px] text-gray-400 block font-sans">Muvaffaqiyatli xaridlar</span>
                      </div>
                      <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 text-center space-y-1">
                        <span className="text-[10px] text-rose-600 font-mono font-bold uppercase">Manba turi</span>
                        <p className="text-lg font-mono font-extrabold text-rose-950 uppercase text-sm pt-0.5">
                          {salesInfo.isMocked ? "Simulyatsiya" : "Real Vaqtda"}
                        </p>
                        <span className="text-[9px] text-gray-400 block font-sans">
                          {salesInfo.isMocked ? "Tahliliy arxiv ma'lumoti" : "Tizimdan olingan ma'lumot"}
                        </span>
                      </div>
                    </div>

                    {/* Payment systems breakdown */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-3">
                      <h3 className="font-display font-bold text-xs text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-500" />
                        TO'LOV TIZIMLARI BO'YICHA SAVDO HAJMI
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-gray-100 p-3 rounded-xl text-center space-y-0.5">
                          <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">CLICK</span>
                          <p className="text-sm font-mono font-extrabold text-gray-950">{salesInfo.click.toLocaleString()} Sōm</p>
                        </div>
                        <div className="border border-gray-100 p-3 rounded-xl text-center space-y-0.5">
                          <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">PAYME</span>
                          <p className="text-sm font-mono font-extrabold text-gray-950">{salesInfo.payme.toLocaleString()} Sōm</p>
                        </div>
                        <div className="border border-gray-100 p-3 rounded-xl text-center space-y-0.5">
                          <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">NAQD</span>
                          <p className="text-sm font-mono font-extrabold text-gray-950">{salesInfo.cash.toLocaleString()} Sōm</p>
                        </div>
                      </div>
                    </div>

                    {/* Sales Log */}
                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-xs text-gray-900 uppercase tracking-wider">
                        {salesInfo.label} ({salesInfo.count} ta)
                      </h3>
                      <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 bg-white">
                        {salesInfo.list.length === 0 ? (
                          <div className="p-6 text-center text-xs text-gray-400 font-semibold">Hech qanday savdo tarixi yo'q</div>
                        ) : (
                          salesInfo.list.map((order, oidx) => (
                            <div key={order.id || oidx} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-gray-50/50 transition-colors">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-xs text-gray-900">{order.id}</span>
                                  <span className="text-[10px] font-mono text-gray-400">{order.date}</span>
                                </div>
                                <p className="text-xs text-gray-500">Mijoz: <span className="text-gray-900 font-bold">{order.name}</span></p>
                                <div className="text-[10px] text-gray-400 font-sans">
                                  Taomlar: {order.items}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 justify-between sm:justify-end">
                                <span className="px-2 py-0.5 rounded bg-amber-50 text-[10px] font-mono font-bold text-amber-700 uppercase">{order.paymentMethod}</span>
                                <span className="font-mono font-extrabold text-xs text-emerald-600">+{order.total.toLocaleString()} Sōm</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ACTIVE ORDERS MODAL */}
                {selectedStat === 'active_orders' && (
                  <div className="space-y-6">
                    {/* Status Counter overview */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border border-amber-100 bg-amber-50/20 p-3 rounded-2xl text-center">
                        <span className="text-[9px] text-amber-600 font-bold font-mono uppercase block">Kutilmoqda</span>
                        <p className="text-xl font-mono font-bold text-amber-900">{orders.filter(o => o.status === 'pending').length}</p>
                      </div>
                      <div className="border border-blue-100 bg-blue-50/20 p-3 rounded-2xl text-center">
                        <span className="text-[9px] text-blue-600 font-bold font-mono uppercase block">Tayyorlanmoqda</span>
                        <p className="text-xl font-mono font-bold text-blue-900">{orders.filter(o => o.status === 'preparing').length}</p>
                      </div>
                      <div className="border border-indigo-100 bg-indigo-50/20 p-3 rounded-2xl text-center">
                        <span className="text-[9px] text-indigo-600 font-bold font-mono uppercase block">Yo'lda</span>
                        <p className="text-xl font-mono font-bold text-indigo-900">{orders.filter(o => o.status === 'on_the_way').length}</p>
                      </div>
                    </div>

                    {/* Active Orders list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-xs text-gray-900">FAOL BUYURTMALAR RO'YXATI ({activeOrdersCount})</h3>
                        <button 
                          onClick={() => {
                            setSelectedStat(null);
                            setCurrentView('admin-orders');
                          }}
                          className="text-[11px] text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Boshqarishga o'tish <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 bg-white">
                        {orders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way').length === 0 ? (
                          <div className="p-10 text-center text-xs text-gray-400 font-semibold">Xozircha faol buyurtmalar yo'q.</div>
                        ) : (
                          orders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way').map((order) => (
                            <div key={order.id} className="p-4 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-extrabold text-xs text-gray-900">{order.id}</span>
                                  <span className="text-[10px] text-gray-400 font-mono">{order.date}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  order.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200/50' :
                                  order.status === 'preparing' ? 'bg-blue-100 text-blue-700 border border-blue-200/50' :
                                  'bg-indigo-100 text-indigo-700 border border-indigo-200/50'
                                }`}>
                                  {order.status === 'pending' && 'Kutilmoqda'}
                                  {order.status === 'preparing' && 'Tayyorlanmoqda'}
                                  {order.status === 'on_the_way' && 'Yo\'lda'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-gray-600">
                                <p>Mijoz: <span className="text-gray-900 font-bold">{order.name}</span> ({order.phone})</p>
                                <p>Manzil: <span className="text-gray-900 font-semibold text-[11px]">{order.address}</span></p>
                              </div>

                              <div className="p-2.5 bg-gray-50 rounded-xl space-y-1">
                                <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Buyurtma qilingan taomlar:</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                  {order.items.map((item, idx) => (
                                    <span key={idx} className="font-medium text-gray-800">
                                      {item.product.name} <span className="text-amber-600 font-bold font-mono">x{item.quantity}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ALL ORDERS STATS MODAL */}
                {selectedStat === 'all_orders' && (
                  <div className="space-y-6">
                    {/* Visual graph / breakdown percentages */}
                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                      <h3 className="font-display font-bold text-xs text-gray-900">BUYURTMALAR HOLATI FOIZ HISOBIDA</h3>
                      
                      {/* Percent bars */}
                      <div className="space-y-2.5">
                        {[
                          { key: 'pending', label: 'Kutilmoqda', color: 'bg-amber-500' },
                          { key: 'preparing', label: 'Tayyorlanmoqda', color: 'bg-blue-500' },
                          { key: 'on_the_way', label: 'Yo\'lda', color: 'bg-indigo-500' },
                          { key: 'delivered', label: 'Yetkazib berilgan', color: 'bg-emerald-500' },
                          { key: 'cancelled', label: 'Bekor qilingan', color: 'bg-rose-500' },
                        ].map((stat) => {
                          const count = orders.filter(o => o.status === stat.key).length;
                          const percent = totalOrdersCount > 0 ? Math.round((count / totalOrdersCount) * 100) : 0;
                          return (
                            <div key={stat.key} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-gray-600">{stat.label}</span>
                                <span className="font-mono text-gray-900">{count} ta ({percent}%)</span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${stat.color}`} style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* All orders historical feed */}
                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-xs text-gray-900">BUYURTMALAR TARIXIY JURNALI</h3>
                      <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 bg-white">
                        {orders.length === 0 ? (
                          <div className="p-8 text-center text-xs text-gray-400 font-semibold">Xozircha buyurtmalar tarixi yo'q</div>
                        ) : (
                          orders.map((order) => (
                            <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50/50">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-extrabold text-xs text-gray-950">{order.id}</span>
                                  <span className="text-[10px] text-gray-400 font-mono">{order.date}</span>
                                </div>
                                <p className="text-xs text-gray-500">Mijoz: <span className="text-gray-900 font-bold">{order.name}</span></p>
                              </div>
                              
                              <div className="flex items-center gap-4 justify-between sm:justify-end">
                                <span className="font-mono font-bold text-xs text-gray-900">{order.total.toLocaleString()} Sōm</span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  order.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                  order.status === 'preparing' ? 'bg-blue-50 text-blue-600' :
                                  order.status === 'on_the_way' ? 'bg-indigo-50 text-indigo-600' :
                                  order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                                  'bg-rose-50 text-rose-600'
                                }`}>
                                  {order.status === 'pending' && 'Kutilmoqda'}
                                  {order.status === 'preparing' && 'Tayyorlanmoqda'}
                                  {order.status === 'on_the_way' && 'Yo\'lda'}
                                  {order.status === 'delivered' && 'Yetkazildi'}
                                  {order.status === 'cancelled' && 'Bekor qilindi'}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MENU ITEMS STATS MODAL */}
                {selectedStat === 'menu_items' && (
                  <div className="space-y-6">
                    {/* Category breakdowns with counts */}
                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                      <h3 className="font-display font-bold text-xs text-gray-900">KATEGORIYALAR BO'YICHA TAOMLAR</h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.keys(productsByCategory).map((cat) => (
                          <div key={cat} className="bg-white border border-gray-100 p-3.5 rounded-2xl text-center space-y-1 shadow-2xs">
                            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">{cat}</span>
                            <p className="text-base font-mono font-extrabold text-gray-950">{productsByCategory[cat].length} xil</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Menu list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-xs text-gray-900">MENYU TAOMLARI RO'YXATI</h3>
                        <button
                          onClick={() => {
                            setSelectedStat(null);
                            setCurrentView('admin-products');
                          }}
                          className="text-[11px] text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Menyuni tahrirlash <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((p) => (
                          <div key={p.id} className="bg-white border border-gray-100 p-3 rounded-2xl flex items-center gap-3 hover:shadow-xs transition-shadow">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-14 h-14 rounded-xl object-cover bg-gray-50"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <span className="text-[8px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded font-mono uppercase">{p.category}</span>
                              <h4 className="text-xs font-bold text-gray-900 truncate">{p.name}</h4>
                              <p className="text-[10px] text-gray-500 truncate leading-relaxed">{p.description}</p>
                              <div className="flex items-center justify-between pt-0.5">
                                <span className="font-mono font-extrabold text-xs text-gray-950">{p.price.toLocaleString()} Sōm</span>
                                <span className="text-[9px] font-medium text-gray-400">Vaqt: {p.prepareTime}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-sans text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Yopish
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
