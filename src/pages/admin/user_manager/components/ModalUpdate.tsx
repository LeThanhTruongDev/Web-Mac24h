import { Modal, Form, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../../stores/UserStore';
import { useEffect } from 'react';

const ModalUpdate = () => {
  const [form] = Form.useForm();

  // Hàm khi nhấn nút OK để lưu thông tin cập nhật
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (userStore.selectedUser && userStore.selectedUser.id) {
          // Cập nhật người dùng
          userStore.updateUserStore(userStore.selectedUser.id, values);
          message.info("Cập nhật người dùng thành công");
        }
        userStore.fetchUserData();  // Cập nhật lại danh sách người dùng
        userStore.closeModalUpdate();  // Đóng modal
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    userStore.closeModalUpdate(); // Đóng modal update
  };

  useEffect(() => {
      if(userStore.selectedUser){
        form.setFieldsValue({
            username: userStore.selectedUser.username,
            password: userStore.selectedUser.password,
            fullName: userStore.selectedUser.fullName,
            phoneNumber: userStore.selectedUser.phoneNumber,
            address: userStore.selectedUser.address
        })
      }

      console.log(userStore.selectedUser);
      
  } , [form, userStore.selectedUser])

  const isEditMode = userStore.selectedUser && userStore.selectedUser.id !== 0;

  return (
    <Modal
      title={isEditMode ? "Cập nhật người dùng" : "Chọn người dùng để chỉnh sửa"}
      open={userStore.isModalUpdate}  // Thay vì `isModalAdd` dùng `isModalUpdate`
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalUpdate);
