import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { colorStore } from "../../../../../stores/ColorStore";

const ModalUpdate = () => {
  const [form] = Form.useForm();

  // Set giá trị ban đầu vào form khi selectedColor thay đổi
  useEffect(() => {
    if (colorStore.selectedColor) {
      form.setFieldsValue({ name: colorStore.selectedColor.name });
    }
  }, [form, colorStore.selectedColor]);

  // Xử lý khi nhấn nút "Cập nhật"
  const handleOk = () => {
    form.validateFields().then((values) => {
      colorStore.updateColorStore(colorStore.selectedColor!.id, values); // Gọi hàm cập nhật từ ColorStore
      form.resetFields(); // Reset form
      colorStore.closeModalUpdate(); // Đóng modal
    });
  };

  return (
    <Modal
      title="Cập nhật màu sắc"
      open={colorStore.isModalUpdate} // Trạng thái mở modal từ ColorStore
      onOk={handleOk}
      onCancel={colorStore.closeModalUpdate} // Đóng modal từ ColorStore
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      style={{ borderRadius: "8px" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên màu sắc"
          rules={[{ required: true, message: "Vui lòng nhập tên màu sắc!" }]}
        >
          <Input placeholder="VD: Red, Blue, Green" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
