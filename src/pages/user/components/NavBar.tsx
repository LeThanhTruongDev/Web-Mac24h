/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Button, Dropdown, Input, Menu } from "antd"
import {
  UserOutlined,
  MenuOutlined,
  PhoneOutlined,
  LaptopOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  MobileOutlined,
  DesktopOutlined,
  RightOutlined,
  TabletOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"
import "../styles/Istore.css"
import { ShoppingCartIcon } from "lucide-react"
import ShoppingCartPreview from "./cart/shopping-cart"
import { observer } from "mobx-react-lite"
import { cartStore } from "../../../stores/Cart"

const { Search } = Input

const  NavBar =  () => {
  const [isMenuOpenUser, setIsMenuOpenUser] = useState(false)
  const [isOpenCategory, setIsOpenCategory] = useState(false)

  const [isMacStoreHovered, setIsMacStoreHovered] = useState(false)
  const [isIstoreHovered, setIsIstoreHovered] = useState(false)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const userId = localStorage.getItem("userId")
          cartStore.getlistItemCartById(Number(userId))
         
        
        } catch (err) {
          console.error('Lỗi khi tải giỏ hàng:', err);
          setError('Không thể tải giỏ hàng');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCart();
    }, []);

    

  const toggleMenuUser = () => {
    setIsMenuOpenUser(!isMenuOpenUser)
  }

  const toggleMenuCategory = () => {
    setIsOpenCategory(!isOpenCategory)
  }

  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")

  const onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("fullName")
    localStorage.removeItem("userId")
    localStorage.removeItem("cartId")
    window.location.reload()
  }

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-5xl tracking-tight text-black-700" style={{ fontFamily: "Lobster, cursive" }}>
            MAC24H
          </Link>

          {/* Search and Contact */}
          <div className="hidden md:flex items-center gap-6">
            <Search
              placeholder="Tìm kiếm..."
              allowClear
              onSearch={() => {}}
              style={{ width: 500 }}
              className="hidden lg:block"
            />
            <div className="flex items-center gap-2 text-black-800">
              <PhoneOutlined className="text-xl" />
              <div>
                <div className="font-medium">0911 100900</div>
                <div className="text-xs text-red-500">Yêu cầu cuộc gọi</div>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="relative">
            <div className="flex items-center gap-4">
              {token != null ? (
                <div className="relative">
                  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                    <Button type="text" className="flex items-center space-x-2">
                      <UserOutlined className="text-xl" />
                      <span>{fullName}</span>
                    </Button>
                  </Dropdown>
                </div>
              ) : (
                <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={toggleMenuUser}>
                  <UserOutlined className="text-xl" />
                </button>
              )}

              {/* Cart Button and Preview */}
              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={toggleCart}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartStore?.listItemCart.length}
                  </span>
                </button>

                {/* Cart Preview Dropdown */}
                {isCartOpen && (
                  <>
                    <div className="absolute right-0 mt-2 z-50">
                      <ShoppingCartPreview cartItems={cartStore?.listItemCart} error={error || ''} loading={loading} />
                    </div>
                    {/* Overlay to close cart when clicking outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)} />
                  </>
                )}
              </div>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpenUser && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <h3 className="text-center font-medium mb-4">
                    CHÀO MỪNG QUÝ KHÁCH
                    <br />
                    ĐẾN VỚI MAC24H
                  </h3>

                  <Link to="/login">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-4">ĐĂNG NHẬP</Button>
                  </Link>

                  <div className="text-center">
                    <h4 className="text-sm mb-2">ĐĂNG KÍ THÀNH VIÊN</h4>
                    <Link to="/register" className="w-full">
                      <Button type="primary" className="w-full">
                        ĐĂNG KÝ
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {/* Overlay to close menu when clicking outside */}
            {isMenuOpenUser && <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpenUser(false)} />}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8">
            <div className="relative">
              <button className="py-3 flex items-center gap-2 hover:text-blue-600" onClick={toggleMenuCategory}>
                <MenuOutlined />
                <span className="font-semibold">Danh Mục</span>
              </button>
              {/* Danh Mục Dropdown */}
              {isOpenCategory && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg z-50">
                  <div className="py-2">
                    <Link to="/mac-store" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <DesktopOutlined />
                      <span className="font-normal">MAC STORE</span>
                    </Link>

                    <Link to="/i-store" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <MobileOutlined />
                      <span className="font-normal">I-STORE</span>
                    </Link>
                    <Link to="/laptop" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <LaptopOutlined />
                      <span className="font-normal">Laptop</span>
                    </Link>
                    <Link to="/thinkpad" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <DesktopOutlined />
                      <span className="font-normal">THINKPAD-THINKBOOK</span>
                    </Link>
                    <Link to="/accessories" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <ToolOutlined />
                      <span className="font-normal">PHỤ KIỆN</span>
                    </Link>
                    <Link to="/support" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <QuestionCircleOutlined />
                      <span className="font-normal">HỖ TRỢ</span>
                    </Link>
                  </div>
                </div>
              )}
              {/* Cart */}
              {/*{isCartOpen && (
                <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
                  <ShoppingCartPreview />
                </div>
              )}*/}
            </div>

            <div className="hidden md:flex items-center gap-8">
              {/* MAC STORE with hover dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsMacStoreHovered(true)}
                onMouseLeave={() => setIsMacStoreHovered(false)}
              >
                <Link to="/mac-store" className="py-3 flex items-center gap-2 hover:text-blue-600">
                  <DesktopOutlined />
                  <span className="font-semibold">MAC STORE</span>
                </Link>
                {/* MAC STORE Dropdown */}
                {isMacStoreHovered && (
                  <div className={`mac-store-dropdown ${isMacStoreHovered ? "visible" : ""}`}>
                    <div className="mac-store-section">
                      <h3>
                        <DesktopOutlined />
                        iMac-Mac Pro
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/imac-pro" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            iMacPro
                          </Link>
                        </li>
                        <li>
                          <Link to="/imac" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            iMAC
                          </Link>
                        </li>
                        <li>
                          <Link to="/mac-pro" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Mac Pro
                          </Link>
                        </li>
                        <li>
                          <Link to="/mac-mini" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Mac Mini
                          </Link>
                        </li>
                        <li>
                          <Link to="/mac-studio" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Mac Studio
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mac-store-section">
                      <h3>
                        <LaptopOutlined />
                        Macbook Air
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/macbook-air-2020-m1" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Air 2020-M1
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-air-2024-m2" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Air 2024-M2
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-air-2024-m3" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            MacBook Air 2024-M3
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-air-15" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            MacBook Air 15 inch
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mac-store-section">
                      <h3>
                        <LaptopOutlined />
                        Macbook Pro
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/macbook-pro-13" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            MacBook Pro 13 inch
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-pro-14" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            MacBook Pro 14 inch
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-pro-16" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Pro 16 inch
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-pro-2019" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Pro 2019
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-pro-2020" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Pro 2020
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mac-store-section">
                      <h3>
                        <LaptopOutlined />
                        Macbook - iMac Cũ
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/imac-mac-mini-cu" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            iMac - Mac Mini Cũ
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-air-cu" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Air Cũ
                          </Link>
                        </li>
                        <li>
                          <Link to="/macbook-pro-cu" className="mac-store-link">
                            <RightOutlined className="text-xs" />
                            Macbook Pro Cũ
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mac-store-section">
                      <div className="mac-store-image">
                        <img
                          src="https://v4.mac24h.vn/images/companies/1/imac_4kcac_13.9.jpg?1692070227648"
                          alt="iMac 4K"
                          className="mac-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* I-STORE */}
              <div
                className="relative"
                onMouseEnter={() => setIsIstoreHovered(true)}
                onMouseLeave={() => setIsIstoreHovered(false)}
              ></div>
              <Link to="/i-store" className="py-3 flex items-center gap-2 hover:text-blue-600">
                <MobileOutlined />
                <span className="font-semibold">I-STORE</span>
              </Link>
              {isIstoreHovered && (
                <div className={`istore-dropdown ${isIstoreHovered ? "visible" : ""}`}>
                  <div className="istore-section">
                    <h3>
                      <MobileOutlined />
                      iPhone
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/iphone-13" className="istore-link">
                          <RightOutlined className="text-xs" />
                          iPhone 13
                        </Link>
                      </li>
                      <li>
                        <Link to="/iphone-14" className="istore-link">
                          <RightOutlined className="text-xs" />
                          iPhone 14
                        </Link>
                      </li>
                      <li>
                        <Link to="/iphone-15" className="istore-link">
                          <RightOutlined className="text-xs" />
                          iPhone 15
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="istore-section">
                    <h3>
                      <TabletOutlined />
                      iPad
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/ipad-air" className="istore-link">
                          <RightOutlined className="text-xs" />
                          iPad Air
                        </Link>
                      </li>
                      <li>
                        <Link to="/ipad-pro" className="istore-link">
                          <RightOutlined className="text-xs" />
                          iPad Pro
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="istore-section">
                    <h3>
                      <RightOutlined />
                      Apple Watch
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/apple-watch-series-7" className="istore-link">
                          <RightOutlined className="text-xs" />
                          Series 7
                        </Link>
                      </li>
                      <li>
                        <Link to="/apple-watch-ultra" className="istore-link">
                          <RightOutlined className="text-xs" />
                          Ultra
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <Link to="/laptop" className="py-3 flex items-center gap-2 hover:text-blue-600">
                <LaptopOutlined />
                <span className="font-semibold">LAPTOP</span>
              </Link>
              <Link to="/thinkpad" className="py-3 flex items-center gap-2 hover:text-blue-600">
                <DesktopOutlined />
                <span className="font-semibold">THINKPAD-THINKBOOK</span>
              </Link>
              <Link to="/accessories" className="py-3 flex items-center gap-2 hover:text-blue-600">
                <ToolOutlined />
                <span className="font-semibold">PHỤ KIỆN</span>
              </Link>
              <Link to="/support" className="py-3 flex items-center gap-2 hover:text-blue-600">
                <QuestionCircleOutlined />
                <span className="font-semibold">HỖ TRỢ</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default observer(NavBar)

