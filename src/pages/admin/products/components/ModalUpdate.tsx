import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { productStore } from '../../../../stores/ProductStore';


const ModalUpdate: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Khi `selectedProduct` thay đổi, set giá trị cho form
    if (productStore.selectedProduct) {
      form.setFieldsValue({
        name: productStore.selectedProduct.name,
        code: productStore.selectedProduct.code,
        image_url: productStore.selectedProduct.image_url,
        category_id: productStore.selectedProduct.category.id,
      });
    }
  }, [productStore.selectedProduct, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (productStore.selectedProduct) {
        await productStore.updateProductStore(productStore.selectedProduct.id, values);
        productStore.closeModalUpdate(); // Đóng modal
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    productStore.closeModalUpdate();
    form.resetFields();
  };

  return (
    <Modal
      title="Cập nhật sản phẩm"
      visible={productStore.isModalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Mã sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image_url" label="URL hình ảnh">
          <Input />
        </Form.Item>
        <Form.Item name="category_id" label="ID danh mục" rules={[{ required: true, message: 'Vui lòng nhập ID danh mục!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
