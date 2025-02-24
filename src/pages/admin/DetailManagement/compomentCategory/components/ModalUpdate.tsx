import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { categoryStore } from "../../../../../stores/Category";


const ModalUpdate = () => {
  const [form] = Form.useForm();

  // Set giá trị ban đầu vào form khi selectedCategory thay đổi
  useEffect(() => {
    if (categoryStore.selectedCategory) {
      form.setFieldsValue({ name: categoryStore.selectedCategory.name });
    }
  }, [form, categoryStore.selectedCategory]);

  // Xử lý khi nhấn nút "Cập nhật"
  const handleOk = () => {
    form.validateFields().then((values) => {
      categoryStore.updateCategoryStore(categoryStore.selectedCategory!.id, values); // Gọi hàm cập nhật từ CategoryStore
      form.resetFields(); // Reset form
      categoryStore.closeModalUpdate(); // Đóng modal
    });
  };

  return (
    <Modal
      title="Cập nhật danh mục"
      open={categoryStore.isModalUpdate} // Trạng thái mở modal từ CategoryStore
      onOk={handleOk}
      onCancel={categoryStore.closeModalUpdate} // Đóng modal từ CategoryStore
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      style={{ borderRadius: "8px" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="VD: Electronics, Furniture, Clothing" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
