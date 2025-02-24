import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { userStore } from '../../../stores/UserStore';
import { observer } from 'mobx-react-lite';
import ModalAdd from './components/ModalAdd';
import ModalUpdate from './components/ModalUpdate'; // Import ModalUpdate
import { useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// UserManager.tsx

interface DataType {
  key: string;
  id: number;
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
}

const UserManager = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'USER NAME',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'FULL NAME',
      dataIndex: 'fullName',
      key: 'fullname',
    },
    {
      title: 'PHONE NUMBER',
      dataIndex: 'phoneNumber',
      key: 'phonenumber',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_: string, record: DataType) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            onClick={() => userStore.handelUpdateLoadData(record)}
            style={
              {
                padding: '8px 16px',
                backgroundColor: '#38B2AC',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              } as React.CSSProperties
            } // Thêm kiểu cho style
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement; // Ép kiểu
              target.style.backgroundColor = '#319795';
              target.style.transform = 'scale(1.05)';
              target.style.boxShadow = '0 4px 8px rgba(56, 178, 172, 0.4)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement; // Ép kiểu
              target.style.backgroundColor = '#38B2AC';
              target.style.transform = 'scale(1)';
              target.style.boxShadow = 'none';
            }}
          />

          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={
              {
                padding: '8px 16px',
                backgroundColor: '#E53E3E',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              } as React.CSSProperties
            } // Ép kiểu style
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement; // Ép kiểu target
              target.style.backgroundColor = '#C53030';
              target.style.transform = 'scale(1.05)';
              target.style.boxShadow = '0 4px 8px rgba(197, 48, 48, 0.4)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement; // Ép kiểu target
              target.style.backgroundColor = '#E53E3E';
              target.style.transform = 'scale(1)';
              target.style.boxShadow = 'none';
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    userStore.deleleUserById(id);
  };

  useEffect(() => {
    userStore.fetchUserData();
  }, []);

  const data: DataType[] = Array.isArray(userStore.listUserData)
    ? userStore.listUserData.map((user) => ({
        key: user.id.toString(),
        id: user.id,
        username: user.username,
        password: user.password,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isDeleted: user.isDeleted,
      }))
    : [];

  return (
    <>
      <h3
        style={{
          textAlign: 'center', // Căn giữa chữ
          color: '#38B2AC', // Màu xanh lam
          fontSize: '24px', // Kích thước chữ
          fontWeight: 'bold', // Đậm chữ
          margin: '20px 0', // Khoảng cách trên và dưới
        }}
      >
        QUẢN LÍ NGƯỜI DÙNG
      </h3>
      <Button
        onClick={userStore.openModalAdd}
        style={{
          padding: '10px 20px', // Padding cho nút
          backgroundColor: '#38B2AC', // Màu nền
          color: '#ffffff', // Màu chữ
          borderRadius: '8px', // Bo tròn góc
          fontSize: '16px', // Kích thước chữ
          cursor: 'pointer', // Hiển thị con trỏ khi hover
          transition: 'background-color 0.5s ease', // Hiệu ứng chuyển màu nền khi hover
          border: 'none', // Xóa viền nút
          margin: '20px',
        }}
      >
        Thêm mới người dùng
      </Button>
      <Table<DataType> columns={columns} dataSource={data} />
      <ModalAdd /> {/* ModalAdd để thêm người dùng mới */}
      <ModalUpdate /> {/* ModalUpdate để chỉnh sửa người dùng */}
    </>
  );
};

export default observer(UserManager);
