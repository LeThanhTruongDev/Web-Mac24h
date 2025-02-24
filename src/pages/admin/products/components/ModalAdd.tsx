/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Space,
  Button,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { productStore } from '../../../../stores/ProductStore';
import { categoryStore } from '../../../../stores/Category';
import { RcFile, UploadFile } from 'antd/es/upload';
import axios from 'axios';
import { ramStore } from '../../../../stores/RamStore';
import { colorStore } from '../../../../stores/ColorStore';
import { sizeStore } from '../../../../stores/SizeStore';
import { memoryStore } from '../../../../stores/MemoryStore';

export interface FileImage<T = any> extends UploadFile {
  url: string;
}

const ModalAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<{ url: string }[]>([]); // Mảng các đối tượng chứa url
  const [urls, setUrls] = useState<string[]>([]); // Mảng các chuỗi
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fields, setFields] = useState([
    {
      name: '',
      ramId: '',
      memoryId: '',
      displaySizeId: '',
      colorId: '',
      price: '',
      quantity:''
    },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        name: '',
        ramId: '',
        memoryId: '',
        displaySizeId: '',
        colorId: '',
        price: '',
        quantity:''
      },
    ]);
  };



  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, key: string, value: any) => {
    const newFields: any = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Lấy URL từ response
      const imageUrls = fileList.map(
        (file: any) => file.response?.file?.[0]?.url
      );

      const productData = {
        ...values,
        imageUrl: imageList[0]?.url,
        productDetailRequests: fields,
      };

      console.log('Product Data:', productData);
      await productStore.addProductStore(productData); // Gửi dữ liệu sản phẩm
      form.resetFields();
      setFileList([]); // Reset danh sách file upload
      productStore.closeModalAdd(); // Đóng modal
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleCancel = () => {
    productStore.closeModalAdd();
    form.resetFields();
    setFileList([]);
  };

  const handleUpload = async (file: RcFile): Promise<boolean | void> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/images',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Lấy URL từ response
      const url = response.data?.file?.[0]?.url;
      if (!url) {
        message.error('Không nhận được URL từ API.');
        return false;
      }

      // Cập nhật URLs và danh sách hình ảnh
      setUrls((prevUrls) => [...prevUrls, url]);
      setImageList((prevImages) => [...prevImages, { url }]);

      // Cập nhật fileList
      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: file.uid, // Dùng UID từ RcFile
          name: file.name,
          status: 'done',
          url, // URL của file
        },
      ]);

      message.success(`${file.name} tải lên thành công!`);
      return false; // Ngăn chặn upload mặc định của Ant Design
    } catch (error) {
      message.error(`${file.name} tải lên thất bại.`);
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    categoryStore.fetchCategoryData();
    ramStore.fetchRamData()
    colorStore.fetchColorData()
    sizeStore.fetchSizeData()
    memoryStore.fetchMemoryData()
  }, []);

  return (
    <Modal
      title='Thêm mới sản phẩm'
      visible={productStore.isModalAdd}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Thêm'
      cancelText='Hủy'
      width={1000}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='Tên sản phẩm'
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='code'
          label='Mã sản phẩm'
          rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='categoryId'
          label='Danh mục'
          rules={[{ required: true, message: 'Vui lòng chọn ID danh mục!' }]}
        >
          <Select placeholder='Chọn danh mục' style={{ width: '100%' }}>
            {categoryStore.categoryList.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Hình ảnh sản phẩm'>
          <Upload
            listType='picture-card'
            fileList={fileList}
            customRequest={({ file }) => handleUpload(file as RcFile)}
          >
            <button style={{ border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {fields.map((field, index) => (
            <Space
              key={index}
              style={{ display: 'flex', marginBottom: 8 }}
              align='baseline'
            >
              <Form.Item label='Tên sản phẩm' style={{ flex: 2 }}>
                <Input
                  value={field.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder='Nhập tên sản phẩm'
                />
              </Form.Item>
              <Form.Item label="Giá" style={{ flex: 1 }}>
                <Input
                  value={field.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </Form.Item>

              <Form.Item label="SL" style={{ flex: 1 }}>
                <Input
                  value={field.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                />
              </Form.Item>
              
              <Form.Item label='RAM' style={{ flex: 2 , width:"100px" }}>
                <Select
                  value={field.ramId}
                  onChange={(value) => handleChange(index, 'ramId', value)}
                  placeholder='Chọn RAM'
                >
                  {ramStore.listRamData.map((it) => (
                    <Select.Option value={it.id}>{it.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label='Bộ nhớ' style={{ flex: 1 , width:"100px" }}>
                <Select
                  value={field.memoryId}
                  onChange={(value) => handleChange(index, 'memoryId', value)}
                  placeholder='Chọn bộ nhớ'
                >
                   {memoryStore.listMemoryData.map(it => (
                    <Select.Option value={it.id}>{it.name}</Select.Option>
                  ))}
                  
                </Select>
              </Form.Item>
              <Form.Item label='Màn hình' style={{ flex: 1 ,width:"100px"}}>
                <Select
                  value={field.displaySizeId}
                  onChange={(value) =>
                    handleChange(index, 'displaySizeId', value)
                  }
                  placeholder='Chọn kích thước màn hình'
                >
                   {sizeStore.listSizeData.map(it => (
                    <Select.Option value={it.id}>{it.name}</Select.Option>
                  ))}
                 
                </Select>
              </Form.Item>
              <Form.Item label='Màu sắc' style={{ flex: 1  ,width:"100px" }}>
                <Select
                  value={field.colorId}
                  onChange={(value) => handleChange(index, 'colorId', value)}
                  placeholder='Chọn màu'
                >
                  {colorStore.listColorData.map(it => (
                    <Select.Option value={it.id}>{it.name}</Select.Option>
                  ))}
                 
                </Select>
              </Form.Item>
              {fields.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => removeField(index)}
                  style={{ color: 'red', marginTop: 30 }}
                />
              )}
            </Space>
          ))}
        </div>

        <Form.Item>
          <Button
            type='dashed'
            onClick={addField}
            icon={<PlusOutlined />}
            style={{ width: '100%' }}
          >
            Thêm sản phẩm chi tiết
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalAdd);
