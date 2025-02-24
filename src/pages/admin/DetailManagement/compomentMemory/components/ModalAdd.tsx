import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { memoryStore } from "../../../../../stores/MemoryStore";

const ModalAdd = () => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      memoryStore.addMemoryStore(values); // Gọi hàm thêm từ store
      form.resetFields(); // Reset dữ liệu form
      memoryStore.closeModalAdd(); // Đóng modal
    });
  };

  return (
    <Modal
      title="Thêm bộ nhớ"
      open={memoryStore.isModalAdd} // Trạng thái mở modal
      onOk={handleOk}
      onCancel={memoryStore.closeModalAdd} // Đóng modal
      okText="Thêm"
      cancelText="Hủy"
      centered // Căn giữa modal
      style={{ borderRadius: "8px" }} // Thiết kế modal bo góc
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên bộ nhớ"
          rules={[{ required: true, message: "Vui lòng nhập tên bộ nhớ!" }]}
        >
          <Input placeholder="VD: 8GB, 16GB, 32GB, 64GB, 128GB" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalAdd);
