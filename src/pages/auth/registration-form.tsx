/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';

import { useState } from 'react';

import { AlertCircle } from 'lucide-react';
import { Button, Checkbox, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../api/userApi';


export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  });

  const nav = useNavigate()

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập tên';
    }


    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tai khoan';
    }

    

    if (!formData.address) {
      newErrors.address = 'Vui long nhap dia chi'
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res =  await addUser (formData)
        console.log(res);
        if(res.username){
          message.success("Dang ki thanh cong")
          nav("/login")
        }
      } catch (error) {
        console.log(error);
        message.error("Dang ki that bai")
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8  '>
      <div className='container mx-auto px-4'>
      <div className='max-w-[1300px] mx-auto bg-white rounded-lg shadow-sm'>
          <div className='container mx-auto md:grid md:grid-cols-5 gap-8 p-8 mt-[150px] max-w-[1400px]'>
            {/* Form Section */}
            <div className='md:col-span-3 space-y-6'>
              <div>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  ĐĂNG KÝ TÀI KHOẢN MỚI
                </h1>
                <nav className='flex mt-2 text-sm text-gray-500 mb-3'>
                  <Link to='/user' className='hover:text-primary'>
                    Trang chủ
                  </Link>
                  <span className='mx-2'>/</span>
                  <span>Đăng ký</span>
                </nav>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                  <label htmlFor='username'>Tai Khoan</label>
                  <Input
                    id='username'
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
                  <label htmlFor='name'>Tên</label>
                  <Input
                    id='name'
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <div className='flex items-center text-red-500 text-sm mt-1'>
                      <AlertCircle className='h-4 w-4 mr-1' />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label htmlFor='phone'>Điện thoại</label>
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <label htmlFor='email'>
                    Nhập địa chỉ dia chi của bạn
                    <span className='text-red-500 ml-0.5'>*</span>
                  </label>
                  <Input
                    id='email'
                    type='text'
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <div className='flex items-center text-red-500 text-sm mt-1'>
                      <AlertCircle className='h-4 w-4 mr-1' />
                      {errors.address}
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

                <div className='space-y-2'>
                  <label htmlFor='confirmPassword'>
                    Xác nhận mật khẩu
                    <span className='text-red-500 ml-0.5'>*</span>
                  </label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && (
                    <div className='flex items-center text-red-500 text-sm mt-1'>
                      <AlertCircle className='h-4 w-4 mr-1' />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className='pt-4'>
                  <h2 className='font-semibold text-gray-900 mb-4'>
                    DANH SÁCH GỬI THƯ
                  </h2>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='newsletter'
                      checked={formData.newsletter}
                      onCheckedChange={(checked: any) =>
                        setFormData({
                          ...formData,
                          newsletter: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor='newsletter' className='text-sm'>
                      Company news and unique discounts for subscribers
                    </label>
                  </div>
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
                  Đăng ký
                </Button>
              </form>
            </div>

            {/* Benefits Section */}
            <div className='md:col-span-2 mt-8 md:mt-0'>
              <div className='bg-gray-50 p-6 rounded-lg'>
                <h2 className='font-semibold text-gray-900 mb-4'>
                  LỢI ÍCH CỦA VIỆC TRỞ THÀNH MỘT THÀNH VIÊN ĐĂNG KÝ
                </h2>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Đăng nhập vào bất kỳ lúc nào để kiểm tra trạng thái đơn đặt
                    hàng
                  </li>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Cá nhân hoá việc mua sắm của bạn
                  </li>
                  <li className='flex items-start'>
                    <span className='text-primary mr-2'>•</span>
                    Mua hàng và thanh toán nhanh hơn trong lần tiếp theo
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
