/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Layout, Menu, Slider, Input, Button, Typography, Breadcrumb, Spin } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import MacbookSlider from "./macbook-slider"
import LaptopSlider from "./laptop-slider"
import { getAllRam } from "../../../api/RamApi"

const { Content } = Layout
const { Title, Paragraph } = Typography

const MacStore: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1830000])
  const [loading, setLoading] = useState(true)
  const [ramOptions, setRamOptions] = useState<any>([])
  const [selectedRam, setSelectedRam] = useState<string[]>([])

  useEffect(() => {
    const fetchRamOptions = async () => {
      try {
        const res = await getAllRam()
        setRamOptions(res.content)
      } catch (error) {
        console.error("Lỗi khi gọi API RAM:", error)
      }
    }
    fetchRamOptions()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleReset = () => setPriceRange([0, 1830000])

  const data = [
    {
      label: "20",
      value: "10",
    },
    {
      label: "30",
      value: "10",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  const menuItems = [
    { key: "imac", label: "iMac-Mac Pro" },
    { key: "macbookair", label: "Macbook Air" },
    { key: "macbookpro", label: "Macbook Pro" },
  ]

  const filterItems = [
    { key: "usage", label: "Nhu cầu sử dụng", children: [] },
    { key: "condition", label: "Tình trạng", children: [] },
    { key: "year", label: "Year", children: [] },
    {
      key: "cpu",
      label: "CPU",
      children: [
        {
          key: "cup",
          label: (
            <ul>
              {data.map((ram: any) => (
                <li key={ram.id}>{ram.name}</li>
              ))}
            </ul>
          ),
        },
      ],
    },
    {
      key: "ram",
      label: "RAM",
      children: ramOptions.map((ram: any) => ({
        key: `ram-${ram.id}`,
        label: ram.name,
      })),
    },
    
    { key: "storage", label: "Storage", children: [] },
    { key: "display", label: "Màn hình", children: [] },
    { key: "graphics", label: "Card Đồ Họa", children: [] },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Layout className="min-h-screen bg-white mt-[150px]">
        <Content className="p-6 max-w-7xl mx-auto">
          <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: "Mac Store" }]} />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64 flex-shrink-0">
              <Menu mode="inline" className="mb-6 rounded-lg border" items={menuItems} />
              <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
                <h3 className="mb-4 font-medium">Giá</h3>
                <Slider
                  range
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  max={1830000}
                  className="mb-4"
                />
                <div className="flex items-center gap-2">
                  <Input
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-24"
                  />
                  <span>-</span>
                  <Input
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-24"
                  />
                </div>
              </div>
              <Menu mode="inline" className="mb-6 border rounded-lg" items={filterItems} />
              <Button icon={<ReloadOutlined />} onClick={handleReset} className="w-full">
                Thiết lập lại
              </Button>
            </div>
            <div className="flex-1">
              <Title level={2} className="font-bold">
                Macbook - iMac - Mac Pro
              </Title>
              <Paragraph className="mb-4 text-lg font-medium">
                Ưu đãi đặc biệt khi mua
                <a href="https://mac24h.vn" className="text-blue-500 font-semibold">
                  {" "}
                  Macbook{" "}
                </a>
                mới tại Mac24h.vn:
              </Paragraph>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  Hỗ Trợ Đổi Từ Macbook Intel → <strong>Macbook M1</strong>.
                </li>
                <li>
                  Hỗ Trợ Nâng Cấp Macbook Cũ, hiệu năng thấp → <strong>lên đời cao!</strong>
                </li>
                <li>
                  Hỗ Trợ Nâng Cấp iMac (<strong>SSD, RAM</strong>).
                </li>
                <li>
                  <strong>Bảo hành 12 Tháng VIP 5 Sao.</strong>
                </li>
                <li>Miễn phí cài đặt chương trình và hỗ trợ ứng dụng vĩnh viễn.</li>
                <li>Cam kết thu đổi giá cao nhất thị trường.</li>
              </ul>
              <div className="space-y-8 mt-6">
                <MacbookSlider />
                <LaptopSlider />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </motion.div>
  )
}

export default MacStore

