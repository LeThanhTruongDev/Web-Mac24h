/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import { getAllProducts } from '../../../api/productApi';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number | string;
  salePrice: number;
  discount?: number;
  badge?: string;
  action: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Asus ROG Zephyrus G14 14inch - 2024',
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/93/asus-rog-zephyrus-g16-2024-mac24h.png',
    originalPrice: 54780000,
    salePrice: 53700000,
    discount: 2,
    action: 'Chọn mẫu',
  },
  {
    id: 2,
    name: 'MacBook Pro 16 inch Apple M3 MAX / M4 MAX',
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/95/Macbook_Pro_16_inch_OpenBox.jpg',
    originalPrice: 65500000,
    salePrice: 64500000,
    discount: 2,
    badge: 'OPENBOX',
    action: 'Chọn mẫu',
  },
  {
    id: 3,
    name: 'Macbook Pro M3 14 inch 2023 - OPENBOX',
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/95/Macbook_Pro_14_inch_OpenBox_1ics-8k.jpg',
    originalPrice: 29900000,
    salePrice: 28900000,
    discount: 3,
    badge: 'OPENBOX',
    action: 'Chọn mẫu',
  },
  {
    id: 4,
    name: 'ThinkPad Z13 13.3inch - 2022 - New Outlet / Refurbished',
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/94/thinkpad_z13.png',
    originalPrice: 25500000,
    salePrice: 24500000,
    discount: 4,
    action: 'Chọn mẫu',
  },
  {
    id: 5,
    name: 'Acer Predator Helios NEO 16inch - 2023 - New Outlet / Refurbished',
    image:
      'https://mac24h.vn/images/thumbnails/270/270/detailed/94/acer-predator-helios-neo-gaming-phn16-71-den-5.jpg_yva8-uv.webp',
    originalPrice: 'Liên hệ để biết giá',
    salePrice: 0,
    badge: 'PreOrder',
    action: 'Chọn mẫu',
  },
];

export function LaptopCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState<any>([]);
  const nav = useNavigate()

  useEffect(() => {
    const GoiApiAllProduct = async () => {
         const res = await  getAllProducts ()
         setProductData(res.content)
    }

    GoiApiAllProduct()
  },[])

  useEffect(() => {
   console.log(productData.map((pro:any) => {
    console.log(pro.productDetails[0]);
   }) );
  } , [productData])
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className='relative overflow-hidden'>
      <div
        className='flex transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${currentIndex * 20}%)` }}
      >
        {productData.map((product:any) => (
          <Link
          key={`${product.id}`}
          to={`/product-detail/${product.id}`}
          className="flex-none w-1/5 px-2 block"
          style={{
            height: "320px", // Chiều cao cố định cho mỗi sản phẩm
            marginTop: "40px", // Thêm khoảng cách phía trên
          }}
        >
          <div className="relative bg-white p-2 rounded-lg shadow-sm h-full">
            <div className="flex flex-col items-center h-full">
              <Img
                src={product.imageUrl} // URL của ảnh
                alt={product.name} // Văn bản thay thế
                loader={<div>Loading...</div>} // Hiển thị khi đang tải ảnh
                className="w-32 h-[150px] object-contain mb-2" // Chiều cao ảnh cố định
              />
              <h3 className="text-xs font-medium mb-1 text-center h-8 line-clamp-2">
                {product.name}
              </h3>
              {typeof product.originalPrice === "number" ? (
                <>
                  <div className="text-gray-500 line-through text-xs">
                    {formatPrice(product.productDetails[0].price)}
                  </div>
                  <div className="text-red-500 font-bold text-sm">
                    {formatPrice(product.salePrice)}
                  </div>
                </>
              ) : (
                <div className="text-gray-600 font-medium text-xs">
                  {product.productDetails[0].price} đ
                </div>
              )}
              <button onClick={() => nav(`/product-detail/${product.id}`)} className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded text-xs hover:bg-blue-600 transition-colors">
                Chọn Mẫu
              </button>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
}
