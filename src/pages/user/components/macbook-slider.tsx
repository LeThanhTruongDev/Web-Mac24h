/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllCategory } from '../../../api/categoryApi';
import { productStore } from '../../../stores/ProductStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
};

const  MacbookSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categoryListApple, setCategoryListApple] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchListAplle = async () => {
      try {
        const res = await getAllCategory({
          supplier: 'macbook',
        });
        setCategoryListApple(res.content);
        setSelectedCategory(res.content[0].id)
      } catch (error) {
        console.log(error);
      }
    };

    fetchListAplle();
  }, []);

  useEffect(() => {
    productStore.setParam({
      ...productStore.params,
      categoryId: selectedCategory,
    });

    console.log(productStore.productDataFilters);
  }, [selectedCategory]);

  return (
    <div className='w-[1200px] mx-auto'>
      <div className='flex flex-col gap-3 mb-6'>
        <h2 className='text-2xl font-bold mt-12'>MACBOOK NỔI BẬT</h2>

        <div className='flex flex-wrap gap-2'>
          {categoryListApple?.map((item: any) => (
            <button
              className={`px-4 py-1.5 rounded-full border transition-colors ${
                selectedCategory === item.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => setSelectedCategory(item.id)}
            >
              {item.name}
            </button>
          ))}
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
          {Array.isArray(productStore.productDataFilters) &&
            productStore.productDataFilters.map((product) => (
              // 
              <Link to = {`/product-detail/${product.id}`}
                key={product.id}
                className='flex-none w-[224px] cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg p-2 bg-white border'
              >
                <div className='relative'>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className='object-cover w-full h-[224px] rounded-lg mb-4'
                  />
                  {/* {product.badge && (
                  <div 
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium
                      ${product.badge.type === 'second-hand' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gradient-to-r from-yellow-400 to-red-500 text-white'
                      }`}
                  >
                    {product.badge.text}
                  </div>
                )} */}
                  {/* {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Giảm {product.discount}%
                  </div>
                )} */}
                </div>
                <div className='space-y-2'>
                  <h3 className='font-medium text-sm line-clamp-2 min-h-[40px]'>
                    {product.name}
                  </h3>
                  <div>
                    <div className='text-lg font-bold text-red-500'>
                      {formatPrice(product.productDetails[0].price)}
                    </div>
                    {/* {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )} */}
                  </div>
                </div>
              </Link>
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

export default observer(MacbookSlider)
