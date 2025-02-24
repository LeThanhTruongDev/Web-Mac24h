'use client'


import { FacebookOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'


export default function Footer() {
  return (
    <footer className="bg-[#222] text-white pt-8 mt-10">
      {/* Newsletter Section */}
      <div className="w-[1200px] mx-auto grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2 bg-gray-100 rounded-lg p-6">
          <h3 className="text-gray-800 text-xl font-bold mb-4 text-center">ĐĂNG KÝ NHẬN TIN TỪ MAC24H</h3>
          <p className="text-gray-600 text-center mb-4">Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Nhập địa chỉ email của bạn"
              className="flex-1"
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Đăng ký
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">Phương thức thanh toán</h3>
          <div className="flex gap-4">
            <img src="/visa.png" alt="Visa" className="h-8" />
            <img src="/mastercard.png" alt="Mastercard" className="h-8" />
          </div>
          <div className="flex gap-2">
            <img src="/internet-banking.png" alt="Internet Banking" className="h-8" />
            <img src="/cash.png" alt="Cash Payment" className="h-8" />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-[1200px] mx-auto grid grid-cols-4 gap-8 py-8 border-t border-gray-700">
        <div>
          <h4 className="font-bold mb-4">GIỚI THIỆU MAC24H</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">Giới thiệu</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Tuyển dụng</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Liên hệ - Bảo hành</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">Mua hàng trả góp</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Quy định đổi trả hàng hóa</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Quy định bảo hành hàng mới</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Quy định bảo hành hàng cũ</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">SẢN PHẨM - DỊCH VỤ</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">Dịch vụ sửa chữa</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Nâng cấp phần cứng</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Cài đặt phần mềm</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">TỔNG ĐÀI HỖ TRỢ</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Gọi mua: 1900 969 686</li>
            <li>Hotline HCM: 0919.011.011 - 0911.100.900</li>
            <li>Hotline Hà Nội: 0964.600.600 - 0888.760.770</li>
          </ul>
        </div>
      </div>

      {/* Address Section */}
      <div className="w-[1200px] mx-auto py-6 border-t border-gray-700 text-gray-400 text-sm">
        <p className="mb-2">
          TP HCM - 306/39 Nguyễn Thị Minh Khai, P. 5, Q. 3, TP HCM - Hotline: 0919.011.011 - 0911.100.900
        </p>
        <p className="mb-4">
          TP Hà Nội: 115, Thái Hà, P. Trung Liệt, Q. Đống Đa, TP Hà Nội - Hotline: 0964.600.600
        </p>
        <p>© 2014 - 2025 Mac24h, All Rights Reserved</p>
      </div>

      {/* Fixed Contact Buttons */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-2">
      <Button
        type="primary"
        shape="circle"
        icon={<FacebookOutlined />}
        size="large"
        className="bg-blue-500 hover:bg-blue-600"
      />
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className="bg-blue-500 hover:bg-blue-600"
      />
      <Button
        type="primary"
        shape="circle"
        icon={<PhoneOutlined />}
        size="large"
        className="bg-blue-500 hover:bg-blue-600"
      />
    </div>
    </footer>
  )
}

