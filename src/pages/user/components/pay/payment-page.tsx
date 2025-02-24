import type React from "react"
import { CreditCard, Smartphone, DollarSign } from "lucide-react"

// Hàm helper để định dạng số tiền
const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
}

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-4xl lg:max-w-6xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Phương thức thanh toán */}
              <div className="md:w-1/2 md:pr-8">
                <h2 className="text-2xl font-semibold mb-6">Phương thức thanh toán</h2>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <CreditCard className="mr-3 text-blue-500" />
                    <span>Thẻ tín dụng / Ghi nợ</span>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <Smartphone className="mr-3 text-green-500" />
                    <span>Mobile Banking</span>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <DollarSign className="mr-3 text-yellow-500" />
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Thông tin thanh toán</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Số thẻ" className="w-full p-2 border rounded" />
                    <div className="flex space-x-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
                      <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded" />
                    </div>
                    <input type="text" placeholder="Tên chủ thẻ" className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>

              {/* Sản phẩm đã chọn */}
              <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 border-t md:border-t-0 md:border-l pt-8 md:pt-0">
                <h2 className="text-2xl font-semibold mb-6">Sản phẩm đã chọn</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="MacBook Pro"
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">MacBook Pro</h3>
                        <p className="text-sm text-gray-500">M1 Chip, 8GB RAM, 256GB SSD</p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatCurrency(30000000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="iPhone 13"
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">iPhone 13</h3>
                        <p className="text-sm text-gray-500">128GB, Xanh dương</p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatCurrency(20000000)}</span>
                  </div>
                </div>
                <div className="mt-8 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-semibold">{formatCurrency(50000000)}</span>
                  </div>
                </div>
                <button className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

