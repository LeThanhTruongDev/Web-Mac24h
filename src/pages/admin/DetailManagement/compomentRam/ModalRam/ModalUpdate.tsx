import { Modal, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ramStore } from "../../../../../stores/RamStore";

const ModalUpdate = () => {
  const [form] = Form.useForm();

  // Hàm khi nhấn nút OK để cập nhật RAM
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (ramStore.selectedRam && ramStore.selectedRam.id) {
          // Gọi hàm cập nhật từ store
          ramStore.updateRamStore(ramStore.selectedRam.id, values);
          message.success("Cập nhật RAM thành công!");
        }
        ramStore.fetchRamData(); // Làm mới danh sách RAM
        ramStore.closeModalUpdate(); // Đóng modal
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Hàm khi nhấn nút Hủy
  const handleCancel = () => {
    ramStore.closeModalUpdate(); // Đóng modal
  };

  // Gán giá trị hiện tại của selectedRam vào form khi modal mở
  useEffect(() => {
    if (ramStore.selectedRam) {
      form.setFieldsValue({
        name: ramStore.selectedRam.name,
      });
    }
  }, [form, ramStore.selectedRam]);

  const isEditMode = ramStore.selectedRam && ramStore.selectedRam.id !== 0;

  return (
    <Modal
      title={isEditMode ? "Cập nhật RAM" : "Chọn RAM để chỉnh sửa"}
      open={ramStore.isModalUpdate} // Kiểm tra trạng thái mở modal
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
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

export default observer(ModalUpdate);
