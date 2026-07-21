import React from 'react';
import { motion } from 'motion/react';
import { Check, Clock, Truck, CheckCircle2, XCircle, Phone, MapPin, ListCollapse, FileText } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface AdminOrdersProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export default function AdminOrders({ orders, updateOrderStatus }: AdminOrdersProps) {
  const [activeTab, setActiveTab] = React.useState<'all' | OrderStatus>('all');
  
  // Sort orders so that pending/active orders appear first, then completed ones
  const statusWeight = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 1;
      case 'preparing': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      case 'cancelled': return 5;
      default: return 3;
    }
  };

  const sortedOrders = [...orders].sort((a, b) => statusWeight(a.status) - statusWeight(b.status));

  // Calculate counts for each status
  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    on_the_way: orders.filter(o => o.status === 'on_the_way').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const tabs = [
    { id: 'all', label: 'Barchasi' },
    { id: 'pending', label: 'Kutilmoqda' },
    { id: 'preparing', label: 'Tayyorlanmoqda' },
    { id: 'on_the_way', label: "Yo'lda" },
    { id: 'delivered', label: 'Yetkazildi' },
    { id: 'cancelled', label: 'Bekor qilindi' },
  ];

  const filteredOrders = sortedOrders.filter(
    order => activeTab === 'all' || order.status === activeTab
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-gray-950 tracking-tight">
            Buyurtmalarni Boshqarish
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Mijozlar buyurtmalarini tekshiring, tayyorlashga bering va yetkazish holatlarini yangilang.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id as 'all' | OrderStatus];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | OrderStatus)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 border-amber-500 text-gray-950 shadow-sm'
                  : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isActive 
                  ? 'bg-gray-950/15 text-gray-950' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm font-sans">
            {activeTab === 'all' 
              ? 'Hozircha hech qanday buyurtma mavjud emas.' 
              : 'Ushbu bo\'limda hozircha buyurtma mavjud emas.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white p-6 rounded-3xl border shadow-xs grid grid-cols-1 lg:grid-cols-4 gap-6 transition-all duration-200 ${
                order.status === 'pending' ? 'border-amber-300 ring-2 ring-amber-300/10' : 'border-gray-100'
              }`}
              id={`admin-order-card-${order.id}`}
            >
              
              {/* Col 1: Order Metadata */}
              <div className="space-y-3 lg:border-r lg:border-gray-50 lg:pr-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-gray-950">{order.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
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
                    {order.status === 'on_the_way' && "Yo'lda"}
                    {order.status === 'delivered' && 'Yetkazildi'}
                    {order.status === 'cancelled' && 'Bekor qilindi'}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="font-display font-bold text-sm text-gray-900">{order.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono font-medium">{order.date}</p>
                  {order.status === 'delivered' && order.deliveredTime && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-100">
                      <Clock className="w-3 h-3 text-emerald-500" />
                      Yetkazildi: {order.deliveredTime}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col gap-1 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5 font-mono text-gray-900">
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {order.phone}
                  </span>
                  <span className="flex items-start gap-1.5 leading-normal">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    {order.address}
                  </span>
                </div>
              </div>

              {/* Col 2 & 3: Ordered Items list */}
              <div className="lg:col-span-2 space-y-4 lg:border-r lg:border-gray-50 lg:pr-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1">
                    <ListCollapse className="w-3.5 h-3.5 text-amber-500" />
                    Buyurtma qilingan taomlar
                  </p>
                  
                  <div className="divide-y divide-gray-50 max-h-32 overflow-y-auto pr-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs font-semibold text-gray-900">
                        <span className="truncate max-w-xs">{item.product.name}</span>
                        <div className="flex items-center gap-4 shrink-0 font-mono">
                          <span className="text-gray-400">x{item.quantity}</span>
                          <span className="text-gray-900">{(item.product.price * item.quantity).toLocaleString('uz-UZ')} Sōm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <div className="bg-gray-50 p-2.5 rounded-xl text-xs text-gray-500 italic">
                    <b>Izoh:</b> "{order.notes}"
                  </div>
                )}
              </div>

              {/* Col 4: Status Update Controls */}
              <div className="flex flex-col justify-between space-y-4 lg:pl-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider font-mono">Umumiy to'lov</span>
                  <p className="font-mono text-lg font-extrabold text-amber-600">
                    {order.total.toLocaleString('uz-UZ')} Sōm
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">{order.paymentMethod} orqali</p>
                </div>

                {/* Status action buttons */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider font-mono block">Holatni o'zgartirish:</span>
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Tayyorlanmoqda (preparing) */}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer border ${
                        order.status === 'preparing'
                          ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                          : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-gray-100 hover:border-blue-100'
                      }`}
                      id={`order-action-prep-${order.id}`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Tayyorlanmoqda
                    </button>

                    {/* Yo'lda (on_the_way) */}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'on_the_way')}
                      className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer border ${
                        order.status === 'on_the_way'
                          ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm'
                          : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border-gray-100 hover:border-indigo-100'
                      }`}
                      id={`order-action-way-${order.id}`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Yo'lda
                    </button>

                    {/* Yetkazildi (delivered) */}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer border ${
                        order.status === 'delivered'
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                          : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-gray-100 hover:border-emerald-100'
                      }`}
                      id={`order-action-done-${order.id}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Yetkazildi
                    </button>

                    {/* Bekor qilindi (cancelled) */}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer border ${
                        order.status === 'cancelled'
                          ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                          : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border-gray-100 hover:border-rose-100'
                      }`}
                      id={`order-action-cancel-${order.id}`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Bekor qilindi
                    </button>

                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
