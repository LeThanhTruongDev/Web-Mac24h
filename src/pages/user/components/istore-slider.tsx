'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'iPhone' | 'iPad' | 'Applewatch';
  hasColorOptions?: boolean;
}

const products: Product[] = [
  // iPhones
  {
    id: 1,
    name: 'iPhone 15 Pro MAX - Used',
    price: 22700000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/95/76345_natural_titanium_update__2_.jpg',
    category: 'iPhone',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max',
    price: 31500000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/95/iphone_16_pro_max_8t8p-0l.jpg',
    category: 'iPhone',
  },
  {
    id: 3,
    name: 'iPhone 16 Pro',
    price: 26900000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/95/iphone_16_pro_max.jpg',
    category: 'iPhone',
  },
  {
    id: 4,
    name: 'iPhone 16 Plus',
    price: 23800000,
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/95/iphone_16_8s2j-zy.jpg',
    category: 'iPhone',
  },
  {
    id: 5,
    name: 'iPhone 16',
    price: 20700000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/95/iphone_16.jpg',
    category: 'iPhone',
  },
  // iPads
  {
    id: 6,
    name: 'iPad Pro M4 11" Wifi - 2024',
    price: 22400000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/94/iPad_Pro_M4_mac24h.webp',
    category: 'iPad',
    hasColorOptions: true,
  },
  {
    id: 7,
    name: 'iPad Pro 12.9 inch 2022 - Apple M2 - WIFI +5G',
    price: 18300000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/92/B07D8E8F-53F3-49FD-915D-E4B6584FDAF1_ie0a-46_vhjp-r1.png',
    category: 'iPad',
    hasColorOptions: true,
  },
  {
    id: 8,
    name: 'iPad Air 6 M2 11" Wifi + 5G - 2024',
    price: 19500000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/95/ipad-air-m2.png',
    category: 'iPad',
    hasColorOptions: true,
  },
  // Apple Watch
  {
    id: 9,
    name: 'AppleWatch SE',
    price: 4990000,
    image:
      '	https://mac24h.vn/images/thumbnails/270/270/detailed/92/applewatchsefamily_qpso-p9.0.png',
    category: 'Applewatch',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
};

export default function IStoreSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    'iPhone' | 'iPad' | 'Applewatch'
  >('iPhone');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredProducts = products.filter(
    (product) => selectedCategory === product.category
  );

  return (
    <div className='w-[1200px] mx-auto'>
      <div className='flex flex-col gap-3 mb-6'>
        <h2 className='text-2xl font-bold mt-12'>I-STORE</h2>

        <div className='flex flex-wrap gap-2'>
          <button
            className={`px-4 py-1.5 rounded-full border transition-colors ${
              selectedCategory === 'iPhone'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
            onClick={() => setSelectedCategory('iPhone')}
          >
            iPhone
          </button>
          <button
            className={`px-4 py-1.5 rounded-full border transition-colors ${
              selectedCategory === 'iPad'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
            onClick={() => setSelectedCategory('iPad')}
          >
            iPad
          </button>
          <button
            className={`px-4 py-1.5 rounded-full border transition-colors ${
              selectedCategory === 'Applewatch'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
            onClick={() => setSelectedCategory('Applewatch')}
          >
            Applewatch
          </button>
        </div>
      </div>

      <div className='relative'>
        <button
          className='absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg hover:bg-gray-100 rounded-full'
          onClick={() => scroll('left')}
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        <div
          ref={scrollRef}
          className='flex gap-4 overflow-x-auto scroll-smooth pb-4'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            width: '100%',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='flex-none w-[224px] cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg p-2 bg-white border'
            >
              <div className='relative'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='object-cover w-full h-[224px] rounded-lg mb-4'
                />
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium text-sm line-clamp-2 min-h-[40px]'>
                  {product.name}
                </h3>
                <div className='text-lg font-bold text-red-500'>
                  {formatPrice(product.price)}
                </div>
                {product.hasColorOptions && (
                  <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm shadow'>
                  Chọn mẫu
                </button>
                
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className='absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg hover:bg-gray-100 rounded-full'
          onClick={() => scroll('right')}
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
