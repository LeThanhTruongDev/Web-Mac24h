import { useState } from 'react';
import { Link } from 'react-router-dom';


const SideBar = () => {
  const [sidenav, setSidenav] = useState(true);
  const [showAttributes, setShowAttributes] = useState(false);

  return (
    <>
      <div className=''>
        <button
          onClick={() => setSidenav(!sidenav)}
          className='p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden'
        >
          <svg
            className='w-5 h-5 fill-current'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>

        {sidenav && (
          <div
            id='sidebar'
            className='bg-white h-screen md:block shadow-xl px-3 w-[350px] md:w-[400px] lg:w-[350px] overflow-x-hidden transition-transform duration-300 ease-in-out'
          >
            <div className='space-y-6 md:space-y-10 mt-10'>
              <h1 className='font-bold text-4xl text-center md:hidden'>
                D<span className='text-teal-600'>.</span>
              </h1>
              <h1 className='hidden md:block font-bold text-sm md:text-xl text-center'>
                Thanh Truong Developer<span className='text-teal-600'>.</span>
              </h1>
              <div id='profile' className='space-y-3'>
                <img
                  src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/444780909_1812278749260128_3772127704392302970_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=0X9R2a1qON8Q7kNvgF0pkUJ&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=ALpAEzg1dYwBYv7rwAeZ8Nu&oh=00_AYDb7p8_Q45O0q_VwrIRneV76acvWlKArP4ofMqkh4OPcA&oe=6757C21F'
                  alt='Avatar user'
                  className='w-10 md:w-16 rounded-full mx-auto'
                />
                <div>
                  <h2 className='font-medium text-xs md:text-sm text-center text-teal-500'>
                    Le Thanh Truong
                  </h2>
                  <p className='text-xs text-gray-500 text-center'>
                    Front-end Developer
                  </p>
                </div>
              </div>

              <div className='flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500'>
                <input
                  type='text'
                  className='w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none'
                  placeholder='Search'
                />
                <button className='rounded-tr-md rounded-br-md px-2 py-3 hidden md:block'>
                  <svg
                    className='w-4 h-4 fill-current'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <div id='menu' className='flex flex-col space-y-2'>
                <a
                  href='#'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                  </svg>
                  Dashboard
                </a>
                <Link
                  to='/admin/product'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z'></path>
                  </svg>
                  Products
                </Link>
                <a
                  href='#'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z'></path>
                    <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z'></path>
                  </svg>
                  Massages
                </a>
                <Link
                  to='#'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
                  onClick={() => setShowAttributes(!showAttributes)} // Toggle hiển thị menu con
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                    <path
                      fillRule='evenodd'
                      d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm4 9a1 1 0 100 2h4a1 1 0 100-2H8z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  Quản Lí Thuộc Tính
                </Link>
                {/* Menu con - chỉ hiển thị khi showAttributes là true */}
                {showAttributes && (
                  <div className='ml-4 mt-2 flex flex-col space-y-2'>
                    <Link
                      to='/admin/ram'
                      className='text-sm text-gray-600 py-1 px-3 hover:bg-teal-500 hover:text-white rounded-md'
                    >
                      RAM
                    </Link>
                    <Link
                      to='/admin/size'
                      className='text-sm text-gray-600 py-1 px-3 hover:bg-teal-500 hover:text-white rounded-md'
                    >
                      Kích Thước
                    </Link>
                    <Link
                      to='/admin/memory'
                      className='text-sm text-gray-600 py-1 px-3 hover:bg-teal-500 hover:text-white rounded-md'
                    >
                      Bộ Nhớ
                    </Link>
                    <Link
                      to='/admin/color'
                      className='text-sm text-gray-600 py-1 px-3 hover:bg-teal-500 hover:text-white rounded-md'
                    >
                      Màu Sắc
                    </Link>
                    <Link
                      to='/admin/category'
                      className='text-sm text-gray-600 py-1 px-3 hover:bg-teal-500 hover:text-white rounded-md'
                    >
                      Danh Mục
                    </Link>
                  </div>
                )}
                <a
                  href='#'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                    <path
                      fillRule='evenodd'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14m-2-8l2-5M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  Đơn Hàng
                </a>
                <Link
                  to='/admin/user-manager'
                  className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-6 h-6 fill-current inline-block'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
                  </svg>
                  Quản Lí Người Dùng
                </Link>
                
              </div>
            </div>
          </div>
        )}

       
      </div>
    </>
  );
};

export default SideBar;
