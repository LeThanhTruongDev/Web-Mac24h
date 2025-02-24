/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { Modal, Button, Table } from "antd";
import { productStore } from "../../../../stores/ProductStore";
import { observer } from "mobx-react-lite";
import { ramStore } from "../../../../stores/RamStore";
import { memoryStore } from "../../../../stores/MemoryStore";
import { colorStore } from "../../../../stores/ColorStore";
import { sizeStore } from "../../../../stores/SizeStore";




const ModalDetails = () => {

  useEffect(() => {
    ramStore.fetchRamData();
    memoryStore.fetchMemoryData();
    colorStore.fetchColorData();
    sizeStore.fetchSizeData();
  }, []);

   
  const {productDetail} = productStore;

  const dataSource =   productDetail?.productDetails?.map((detail:any, index:any) => ({
    key: detail.id, 
    stt: index + 1, 
    id: detail.id,
    name: detail.name,
    quantity: detail.quantity,
    ram: detail.ram?.name,
    memory: detail.memory?.name,
    color: detail.color?.name,
    price: detail.price,
  }));


  const maxPrice = productDetail?.productDetails && productDetail.productDetails.length > 0
  ? Math.max(...productDetail.productDetails.map((detail:any) => detail.price))
  : 0; 

  const totalQuantity = productDetail?.productDetails?.reduce(
    (total:any, detail:any) => total + (detail?.quantity || 0), 
    0 
  );
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Tên chi tiết',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Ram',
      dataIndex: 'ram',
      key: 'ramName',
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memoryName',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'colorName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
  ];
 

  return (
    <Modal
      title="Chi tiết sản phẩm"
      visible={productStore.isOpenModalGetById}
      onCancel={() => productStore.setisOpenModalGetById(false)}
      footer={null}
      width={800}
    >
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <img
          src={productDetail.imageUrl}
          alt={productDetail.name}
          style={{ width: "150px", height: "auto", borderRadius: "8px" }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "10px" }}>{productDetail.name}</h2>
          <p>
            <strong>Mã sản phẩm:</strong> {productDetail.code}
          </p>
          <p>
            <strong>Giá:</strong> {maxPrice} VND
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              style={{
                color: totalQuantity === 0 ? "red" : "green",
              }}
            >
              {totalQuantity === 0 ? "Hết hàng " : "Còn hàng "}
            </span>
          </p>
          <p>
            <strong>Số lượng:</strong> {totalQuantity}
          </p>
          <p>
            <strong>Danh mục:</strong> {productDetail?.category?.name}
          </p>
        </div>
      </div>

     
      <h3 style={{ marginTop: "20px" }}>Sản phẩm liên quan</h3>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={() => productStore.setisOpenModalGetById(false)}
        >
          Đóng
        </Button>
      </div>
    </Modal>

  );
};

export default observer(ModalDetails);
