/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import { CircularProgress, Button } from '@mui/material';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

interface ShoppingCartPreviewProps{
  cartItems : CartItem[],
  loading : boolean,
  error : string 
  
}

const ShoppingCartPreview: React.FC<ShoppingCartPreviewProps> = ({ cartItems , loading , error}) => {

  

  const total =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <div className='p-4 w-[400px] max-w-md bg-white rounded border border-gray-200 shadow-sm'>
      <h2 className='text-lg font-semibold mb-4'>Giỏ hàng</h2>

      {loading ? (
        <div className='flex justify-center items-center py-4'>
          <CircularProgress size={24} />
        </div>
      ) : error ? (
        <p className='text-center text-sm text-red-500 py-4'>{error}</p>
      ) : cartItems?.length === 0 ? (
        <p className='text-center text-sm text-gray-500 py-4'>
          Giỏ hàng của bạn trống.
        </p>
      ) : (
        <div>
          {cartItems?.map((item) => (
            <div key={item.id} className='flex items-center gap-3 py-3'>
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                width={60}
                height={60}
                className='rounded object-cover'
              />
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                <p className='text-sm text-gray-500'>
                  {item.quantity} x {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}

          <div className='mt-3 pt-3 border-t border-gray-200'>
            <div className='flex justify-between items-center mb-3'>
              <span className='text-sm'>Tổng số mục:</span>
              <span className='text-sm font-medium'>
                {formatCurrency(total)}
              </span>
            </div>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              className='!normal-case !rounded !text-sm !py-2  '
              style = {{margin : "10px 0"}}
            >
              Xem giỏ hàng
            </Button>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              className='!normal-case !rounded !text-sm !py-2'
              onClick={() => (window.location.href = '/payment')}
            >
              Thanh toán ngay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPreview
