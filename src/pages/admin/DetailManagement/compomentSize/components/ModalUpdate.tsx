import { Modal, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { sizeStore } from "../../../../../stores/SizeStore";

const ModalUpdate = () => {
  const [form] = Form.useForm();

  // Hàm xử lý khi nhấn OK để cập nhật thông tin kích thước
  const handleOk = () => {
    form
      .validateFields() // Kiểm tra giá trị form
      .then((values) => {
        if (sizeStore.selectedSize && sizeStore.selectedSize.id) {
          // Gọi hàm cập nhật từ store
          sizeStore.updateSizeStore(sizeStore.selectedSize.id, values);
          message.success("Cập nhật kích thước thành công!");
        }
        sizeStore.fetchSizeData(); // Làm mới danh sách kích thước
        sizeStore.closeModalUpdate(); // Đóng modal
        form.resetFields(); // Reset form
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  // Hàm xử lý khi nhấn Cancel
  const handleCancel = () => {
    sizeStore.closeModalUpdate(); // Đóng modal
    form.resetFields(); // Xóa dữ liệu form
  };

  // Gán dữ liệu vào form khi modal mở
  useEffect(() => {
    if (sizeStore.selectedSize) {
      form.setFieldsValue({
        name: sizeStore.selectedSize.name,
      });
    }
  }, [form, sizeStore.selectedSize]);

  const isEditMode = sizeStore.selectedSize && sizeStore.selectedSize.id !== 0;

  return (
    <Modal
      title={isEditMode ? "Cập nhật kích thước" : "Chọn kích thước để chỉnh sửa"}
      open={sizeStore.isModalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên kích thước"
          rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
        >
          <Input placeholder="VD: 1920x1080" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
