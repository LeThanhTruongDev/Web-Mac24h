import { Modal, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ramStore } from "../../../../../stores/RamStore";

const ModalAdd = () => {
  const [form] = Form.useForm();

  // Hàm xử lý khi nhấn nút OK
  const handleOk = () => {
    form
      .validateFields() // Kiểm tra các trường hợp hợp lệ
      .then((values) => {
        ramStore.addRamStore(values); // Gọi hàm thêm RAM từ store
        message.success("Thêm RAM thành công!");
        ramStore.fetchRamData(); // Làm mới danh sách RAM
        ramStore.closeModalAdd(); // Đóng modal
        form.resetFields(); // Reset form
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Hàm xử lý khi nhấn nút Hủy
  const handleCancel = () => {
    ramStore.closeModalAdd(); // Đóng modal
    form.resetFields(); // Xóa dữ liệu form
  };

  // Đảm bảo form luôn reset mỗi khi mở modal
  useEffect(() => {
    if (!ramStore.isModalAdd) {
      form.resetFields();
    }
  }, [ramStore.isModalAdd, form]);

  return (
    <Modal
      title="Thêm RAM mới"
      open={ramStore.isModalAdd} // Trạng thái mở modal
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên RAM"
          rules={[{ required: true, message: "Vui lòng nhập tên RAM!" }]}
        >
          <Input placeholder="VD: 8GB, 16GB, 32GB" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalAdd);
