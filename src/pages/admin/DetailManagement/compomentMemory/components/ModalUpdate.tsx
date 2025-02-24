import { Modal, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { useEffect } from "react";
import { memoryStore } from "../../../../../stores/MemoryStore";

const ModalUpdate = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (memoryStore.selectedMemory) {
      form.setFieldsValue({ name: memoryStore.selectedMemory.name });
    }
  }, [form, memoryStore.selectedMemory]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      memoryStore.updateMemoryStore(memoryStore.selectedMemory!.id, values);
      form.resetFields();
      memoryStore.closeModalUpdate();
    });
  };

  return (
    <Modal title="Cập nhật bộ nhớ" open={memoryStore.isModalUpdate} onOk={handleOk} onCancel={memoryStore.closeModalUpdate}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên bộ nhớ" rules={[{ required: true, message: "Vui lòng nhập tên bộ nhớ!" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
