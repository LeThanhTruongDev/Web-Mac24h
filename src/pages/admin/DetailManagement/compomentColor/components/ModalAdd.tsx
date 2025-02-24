import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { colorStore } from "../../../../../stores/ColorStore";

const ModalAdd = () => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      colorStore.addColorStore(values);
      form.resetFields();
      colorStore.closeModalAdd();
    });
  };

  console.log("ModalAdd: isModalAdd =", colorStore.isModalAdd); // Thêm log kiểm tra

  return (
    <Modal
      title="Thêm màu sắc"
      open={colorStore.isModalAdd} // Trạng thái mở modal
      onOk={handleOk}
      onCancel={colorStore.closeModalAdd}
      okText="Thêm"
      cancelText="Hủy"
      centered
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

export default observer(ModalAdd); // Đảm bảo được bọc bằng observer
