import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { sizeStore } from "../../../../../stores/SizeStore";


const ModalAdd = () => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      sizeStore.addSizeStore(values);
      form.resetFields();
      sizeStore.closeModalAdd();
    });
  };

  return (
    <Modal
      title="Thêm kích thước"
      open={sizeStore.isModalAdd}
      onOk={handleOk}
      onCancel={sizeStore.closeModalAdd}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên kích thước"
          rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
        >
          <Input placeholder="VD: S, M, L, XL, XXL, XXXL" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalAdd);
