import { Modal, Form, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../../stores/UserStore';

const ModalAdd = () => {

  // Khởi tạo form
  const [form] = Form.useForm();

  // Hàm khi nhấn nút OK để lưu thông tin
  const handleOk = () => {
    form
      .validateFields()  // Kiểm tra các trường hợp hợp lệ
      .then((values) => {
        userStore.addUserStore(values)
        message.info("Thêm thành công")
        userStore.fetchUserData()    
        userStore.closeModalAdd();  
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  
  const handleCancel = () => {
    userStore.closeModalAdd();  // Đóng modal
  };

  return (
    <>
      <Modal
        title="Thêm người dùng mới"
        open={userStore.isModalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical" 
          initialValues={{}}  
        >
          <Form.Item
            name="username"
            label="Tên người dùng"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default observer(ModalAdd);
