/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { productStore } from '../../../stores/ProductStore';
import { observer } from 'mobx-react-lite';

import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ModalAdd from './components/ModalAdd';
import ModalUpdate from './components/ModalUpdate';
import ModalDetails from './components/ModalDetail';



// Interface dữ liệu cho bảng sản phẩm
interface DataType {
  key: string;
  id: number;
  name: string;
  code: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  category: string;
}

const ProductManager = () => {


   const [productId , setProductId] = useState(0);




  

  useEffect(( ) => {
    if(productId !== 0) {
      productStore.fetchProductById(productId);
    }
     
  } , [productId])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CODE',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'IMAGE',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrls: string) => {
        return imageUrls ? (
          <Image
            src={imageUrls}
            alt="Product"
            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
            preview={{
              mask: "Click to Preview",
            }}
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_: string, record: DataType) => (
        <Space size="middle">
          {/* Nút Edit */}
          <Button
            icon={<EditOutlined />}
            onClick={() => productStore.handleUpdateLoadData(record)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#38B2AC',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
          {/* Nút Delete */}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#E53E3E',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
          {/* Nút View */}
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setProductId(record.id)
              productStore.setisOpenModalGetById(true)
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3182CE',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    productStore.deleteProductById(id);
  };

 

  useEffect(() => {
    productStore.fetchProductData();
  }, []);

  const data: DataType[] = Array.isArray(productStore.listProductData)
    ? productStore.listProductData.map((product) => ({
        key: product.id.toString(),
        id: product.id,
        name: product.name,
        code: product.code,
        imageUrl: product.imageUrl,
        created_at: product.created_at,
        updated_at: product.updated_at,
        is_deleted: product.is_deleted,
        category: product?.category.name,
      }))
    : [];

  return (
    <>
      <h3
        style={{
          textAlign: 'center',
          color: '#38B2AC',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '20px 0',
        }}
      >
        QUẢN LÝ SẢN PHẨM
      </h3>
      <Button
        onClick={productStore.openModalAdd}
        style={{
          padding: '10px 20px',
          backgroundColor: '#38B2AC',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '20px',
        }}
      >
        Thêm mới sản phẩm
      </Button>
      <Table<DataType> columns={columns} dataSource={data} />
      <ModalAdd /> {/* Modal để thêm sản phẩm */}
      <ModalUpdate /> {/* Modal để chỉnh sửa sản phẩm */}
  
        <ModalDetails/>
    </>
  );
};

export default observer(ProductManager);
