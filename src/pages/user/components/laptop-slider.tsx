/* eslint-disable @typescript-eslint/no-explicit-any */


import { useRef, useEffect, useState } from "react"
import { getAllCategory } from "../../../api/categoryApi"
import { filterProduct } from "../../../api/productApi"
import { Link } from "react-router-dom"


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
}

export default function LaptopSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const [selectedBrand, ] = useState<string | null>(null)
  const [categoryWindown, setCategoryListWindown] = useState<any>([]);
  const [categoryId, setSelectedCateogryId] = useState<number>(0);
  const [productData , setProductData] = useState([])


  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
     const fetchApiProductWindown = async (categoryId:number) => {
      const params:any = {
        page: 0,
        size: 10,
        categoryId:categoryId,
        code:'',
        name:''

      }
       const res = await filterProduct(params)
      setProductData(res.content)
     }

     fetchApiProductWindown(categoryId)
       
  } , [categoryId])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (autoScrollEnabled) {
      intervalId = setInterval(() => {
        scroll('right');
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoScrollEnabled]);

  // Filter products based on selected brand
  // const filteredProducts = selectedBrand
  //   ? products.filter(product => product.brand === selectedBrand)
  //   : products;

    useEffect(() => {
      const fetchListWindown = async () => {
        try {
          const res = await getAllCategory({
            supplier: 'windown',
          });
          setCategoryListWindown(res.content);
          setSelectedCateogryId(res.content[0].id)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchListWindown();
    }, []);
  

  return (
    <div className="w-[1200px] mx-auto">
      <div className="flex flex-col gap-3 mb-6">
        <h2 className="text-2xl font-bold mt-12">LAPTOP BÁN CHẠY</h2>

        <div className="flex flex-wrap gap-2">
         
          {categoryWindown.map((item:any) => (
            <span 
            className={`px-3 py-1 rounded-md cursor-pointer ${
              selectedBrand === null 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCateogryId(item.id)}
          >
            {item.name}
          </span>
          ))}
          
 
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setAutoScrollEnabled(false)}
        onMouseLeave={() => setAutoScrollEnabled(true)}
      >
        <button
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg hover:bg-gray-100 rounded-full"
          onClick={() => scroll('left')}
        >
          &#8249;
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            width: '100%'
          }}
        >
        {Array.isArray(productData) &&
                 productData.map((product:any) => (
                    <Link to = {`/product-detail/${product.id}`}
                      key={product.id}
                      className='flex-none w-[224px] cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg p-2 bg-white border'
                    >
                      <div className='relative'>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className='object-cover w-full h-[224px] rounded-lg mb-4'
                        />
                        {/* {product.badge && (
                        <div 
                          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium
                            ${product.badge.type === 'second-hand' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gradient-to-r from-yellow-400 to-red-500 text-white'
                            }`}
                        >
                          {product.badge.text}
                        </div>
                      )} */}
                        {/* {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Giảm {product.discount}%
                        </div>
                      )} */}
                      </div>
                      <div className='space-y-2'>
                        <h3 className='font-medium text-sm line-clamp-2 min-h-[40px]'>
                          {product.name}
                        </h3>
                        <div>
                          <div className='text-lg font-bold text-red-500'>
                            {formatPrice(product.productDetails[0].price)}
                          </div>
                          {/* {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )} */}
                        </div>
                      </div>
                    </Link>
                  ))}
        </div>

        <button
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg hover:bg-gray-100 rounded-full"
          onClick={() => scroll('right')}
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}

