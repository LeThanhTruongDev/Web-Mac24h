import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { categoryStore } from "../../../../../stores/Category";


const ModalAdd = () => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      categoryStore.addCategoryStore(values); // Gọi hàm thêm danh mục từ store
      form.resetFields(); // Reset form sau khi thêm
      categoryStore.closeModalAdd(); // Đóng modal
    });
  };

  console.log("ModalAdd: isModalAdd =", categoryStore.isModalAdd); // Thêm log kiểm tra

  return (
    <Modal
      title="Thêm danh mục"
      open={categoryStore.isModalAdd} // Trạng thái mở modal
      onOk={handleOk}
      onCancel={categoryStore.closeModalAdd}
      okText="Thêm"
      cancelText="Hủy"
      centered
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

export default observer(ModalAdd); // Đảm bảo được bọc bằng observer
