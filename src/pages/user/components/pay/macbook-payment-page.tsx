import type React from "react"
import { CreditCard, Lock } from "lucide-react"

const MacBookPaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img src="/placeholder.svg?height=200&width=200" alt="MacBook" className="h-7 sm:h-8" />
              <h1 className="text-2xl font-semibold">MacBook Pro Payment</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=80&width=120"
                    alt="MacBook Pro"
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="text-xl font-bold">MacBook Pro</p>
                    <p className="text-gray-500">M1 Chip, 8GB RAM, 256GB SSD</p>
                  </div>
                </div>
                <p className="text-xl font-bold">Total: $1,299.00</p>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Full Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Full Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input
                    type="email"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="0000 0000 0000 0000"
                    />
                    <CreditCard className="absolute right-3 top-2 text-gray-400" size={20} />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Expiry</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">CVV</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="000"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button className="flex justify-center items-center w-full px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 text-white">
                  <Lock className="mr-2" size={20} />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MacBookPaymentPage

