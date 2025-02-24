import React from 'react';
import NavBar from './components/NavBar';
import Courosel from './components/Courosel';
import { CountdownTimer } from './components/countdown-timer';
import { LaptopCarousel } from './components/laptop-courosel';
import LaptopSlider from './components/laptop-slider';

import IStoreSlider from './components/istore-slider';
import Footer from './components/footer';
import MacbookSlider from './components/macbook-slider';
import MacStore from './components/macstore';

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Courosel />
      <div className='bg-white border-8 border-red-500 p-4 mt-[43px] max-w-[1200px] h-[403px] mx-auto'>
        <div className='flex flex-col md:flex-row items-center gap-4 h-full'>
          {/* Phần tiêu đề và thông tin bên trái */}
          <div className='md:w-1/4 text-center md:text-left'>
            <h1 className='text-2xl font-bold leading-tight text-red-500'>
              HAPPY NEW YEAR 2025!
              <br />
              LAPTOP GIẢM NGAY 1 TRIỆU
            </h1>

            <div className='mt-2'>
              <a href='#' className='text-blue-600 hover:underline text-sm'>
                Chương trình ưu đãi mới nhất!
              </a>
              <p className='font-medium mt-1 text-gray-800 text-sm'>
                Khuyến mãi Hot: GIỜ VÀNG GIÁ SỐC:
              </p>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer />

            <a
              href='#'
              className='inline-block mt-2 text-red-500 hover:underline text-sm'
            >
              Xem danh sách khuyến mãi →
            </a>
          </div>

          {/* Phần carousel sản phẩm bên phải */}
          <div className='md:w-3/4 h-full'>
            <LaptopCarousel />
          </div>
        </div>
      </div>
      <LaptopSlider />
      <MacbookSlider />
      <IStoreSlider />
      <Footer />
      // Trong component cha
      {/* <MacStore /> */}
    </div>
  );
}
