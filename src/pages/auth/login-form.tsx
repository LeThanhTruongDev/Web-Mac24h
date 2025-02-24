'use client';

import type React from 'react';
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/userApi';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const nav = useNavigate()

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await login(formData);
        localStorage.setItem('fullName', res?.user?.fullName);
        localStorage.setItem('token', res?.token);
        localStorage.setItem("cartId" , res?.cart?.id)
        localStorage.setItem("userId" , res?.user?.id)
        message.success('dang nhap thanh cong');
        nav("/user")
      } catch (error) {
        console.log(error);
        message.error('Vui long kiem tra lai tai khoan va mat');
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-sm'>
          <div className='container mx-auto md:grid md:grid-cols-5 gap-8 p-8 mt-[150px] max-w-[1400px]'>
            {/* Form Section */}
            <div className='md:col-span-3 space-y-6'>
              <div>
                <nav className='flex mt-2 text-sm text-gray-500 mb-3'>
                  <Link to='/user' className='hover:text-primary'>
                    Trang chủ
                  </Link>
                  <span className='mx-2'>/</span>
                  <span>Đăng nhập</span>
                </nav>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  ĐĂNG NHẬP TÀI KHOẢN
                </h1>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='username'>
                    Tên đăng nhập
                    <span className='text-red-500 ml-0.5'>*</span>
                  </label>
                  <Input
                    id='username'
                    type='text'
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className={errors.username ? 'border-red-500' : ''}
                  />
                  {errors.username && (
                    <div className='flex items-center text-red-500 text-sm mt-1'>
                      <AlertCircle className='h-4 w-4 mr-1' />
                      {errors.username}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label htmlFor='password'>
                    Mật khẩu
                    <span className='text-red-500 ml-0.5'>*</span>
                  </label>
                  <Input
                    id='password'
                    type='password'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <div className='flex items-center text-red-500 text-sm mt-1'>
                      <AlertCircle className='h-4 w-4 mr-1' />
                      {errors.password}
                    </div>
                  )}
                </div>

                <Button
                  htmlType='submit'
                  style={{ backgroundColor: '#6B7280', color: '#fff' }}
                  className='focus:outline-none focus:ring-0 px-4 py-2 rounded-md'
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#374151'; // Xám đậm hơn khi hover
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#6B7280'; // Quay lại màu cũ khi rời chuột
                  }}
                >
                  Đăng nhập
                </Button>
              </form>
            </div>

            {/* Benefits Section */}
            <div className='md:col-span-2 mt-8 md:mt-0'>
              <div className='bg-gray-50 p-6 rounded-lg'>
                <h2 className='font-semibold text-gray-900 mb-4'>
                  LỢI ÍCH CỦA VIỆC ĐĂNG NHẬP
                </h2>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Truy cập nhanh chóng vào lịch sử đơn hàng
                  </li>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Nhận thông báo về các ưu đãi đặc biệt
                  </li>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Thanh toán nhanh hơn với thông tin đã lưu
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
