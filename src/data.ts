import { Product, PromoCode, Order } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Klassik Qovurdoq Manti",
    description: "Mayda to'g'ralgan barra mol go'shti va dumi, sarxil piyoz va maxsus ziravorlar bilan qovurilib, so'ng bug'da pishirilgan haqiqiy manti.",
    price: 45000,
    category: "Manti",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
    tags: ["Xit", "Issiq", "Go'shtli"],
    rating: 4.9,
    prepareTime: "25-30 daqiqa"
  },
  {
    id: '2',
    name: "Go'shtli Tandir Somsa",
    description: "Tandirda qizarguncha pishirilgan, ichida sharbatga to'la mol go'shti va piyoz solingan qarsildoq somsa.",
    price: 15000,
    category: "Somsa",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=600",
    tags: ["Mashhur", "Tandir"],
    rating: 4.8,
    prepareTime: "20 daqiqa"
  },
  {
    id: '3',
    name: "Qiymali Bug' Mantisi",
    description: "Yumshoq xamir ichiga joylangan mayda qiymali go'sht va piyoz aralashmasi. Nordon smetana yoki suzma bilan tavsiya etiladi.",
    price: 38000,
    category: "Manti",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    tags: ["Bug'da", "An'anaviy"],
    rating: 4.7,
    prepareTime: "25 daqiqa"
  },
  {
    id: '4',
    name: "Achchiq-Chuchuk Salat",
    description: "Tandirdan chiqqan issiq manti va somsa uchun eng mos salat. Sarxil pomidor, piyoz, ko'katlar va achchiq qalampir.",
    price: 12000,
    category: "Salatlar",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    tags: ["Yengil", "Vitaminli"],
    rating: 4.9,
    prepareTime: "5-10 daqiqa"
  },
  {
    id: '5',
    name: "Chorva Maxsus Somsasi",
    description: "Qo'y go'shti va dumi qo'shilgan, sirli ziravorlar bilan qorilgan o'zgacha mazali tandir somsasi.",
    price: 18000,
    category: "Somsa",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600",
    tags: ["Yangi", "To'yimli"],
    rating: 4.9,
    prepareTime: "20 daqiqa"
  },
  {
    id: '6',
    name: "Ko'katli Suzma",
    description: "Sarxil kashnich, shivit, rayhon va ozgina sarimsoqpiyoz qo'shilgan quyuq an'anaviy suzma shaklidagi nordon qayla.",
    price: 8000,
    category: "Salatlar",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
    tags: ["Sovuq", "Sog'lom"],
    rating: 4.6,
    prepareTime: "5 daqiqa"
  },
  {
    id: '7',
    name: "An'anaviy Ko'k Choy",
    description: "Chinnigul choynakda damlangan milliy ko'k choy. Novvot va limon parraklari bilan birga keltiriladi.",
    price: 5000,
    category: "Ichimliklar",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    tags: ["Issiq", "Choyxonacha"],
    rating: 4.9,
    prepareTime: "5 daqiqa"
  },
  {
    id: '8',
    name: "Limonli Qora Choy",
    description: "Tinchlantiruvchi ta'sirga ega, yangi limon parraklari bilan damlangan xushbo'y qora choy.",
    price: 6000,
    category: "Ichimliklar",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=600",
    tags: ["Issiq", "Limonli"],
    rating: 4.7,
    prepareTime: "5 daqiqa"
  },
  {
    id: '9',
    name: "Coca-Cola 1.5 L",
    description: "Muzday va tetiklashtiruvchi Coca-Cola oilaviy hajmdagi idishda.",
    price: 15000,
    category: "Ichimliklar",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    tags: ["Muzday", "Gazlangan"],
    rating: 4.8,
    prepareTime: "3 daqiqa"
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: "MANTI20",
    discountPercent: 20,
    description: "Manti sevuvchilar uchun maxsus 20% chegirma!",
    minOrderValue: 50000
  },
  {
    code: "YANGI",
    discountPercent: 15,
    description: "Birinchi buyurtma uchun 15% chegirma!",
  },
  {
    code: "CHAYXONA",
    discountPercent: 10,
    description: "An'anaviy choyxona chegirmasi 10%!",
    minOrderValue: 40000
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "JM-3829",
    name: "Jasur Abdullayev",
    phone: "+998 90 123 45 67",
    address: "Sherobod tumani, Mustaqillik ko'chasi, 24-uy",
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1
      }
    ],
    subtotal: 107000,
    discount: 21400,
    deliveryFee: 15000,
    total: 100600,
    status: "preparing",
    paymentMethod: "click",
    date: "Bugun, 12:45"
  },
  {
    id: "JM-3828",
    name: "Madina Karimova",
    phone: "+998 93 555 11 22",
    address: "Sherobod tumani, Alisher Navoiy ko'chasi, 12-uy",
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 4
      },
      {
        product: INITIAL_PRODUCTS[8],
        quantity: 1
      }
    ],
    subtotal: 75000,
    discount: 0,
    deliveryFee: 15000,
    total: 90000,
    status: "on_the_way",
    paymentMethod: "payme",
    date: "Bugun, 12:10"
  },
  {
    id: "JM-3827",
    name: "Shaxzod Alimov",
    phone: "+998 99 888 77 66",
    address: "Sherobod tumani, Do'stlik ko'chasi, 5-uy",
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 3
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 2
      }
    ],
    subtotal: 130000,
    discount: 13000,
    deliveryFee: 15000,
    total: 132000,
    status: "delivered",
    paymentMethod: "cash",
    date: "Kecha, 19:30"
  }
];
