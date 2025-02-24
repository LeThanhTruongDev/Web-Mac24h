/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, Card, Image, Button, Radio, message } from "antd";
import {  Check, Phone, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../../api/productApi";
import { addToCart, CartReq } from "../../../../api/cartApi";
import { cartStore } from "../../../../stores/Cart";

const { Panel } = Collapse;


export default function ProductPage() {
    const { id } = useParams();
    const [productData, setProductData] = useState<any>({});
    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [warranty, setWarranty] = useState("12 tháng");

    useEffect(() => {
        const fetchData = async (id: number) => {
            const res = await fetchProductById(id);
            setProductData(res);
            setSelectedDetail(res.productDetails?.[0] || null);
        };
        fetchData(Number(id));
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = async () => {
        if (!selectedDetail) {
            message.warning("Vui lòng chọn cấu hình sản phẩm!");
            return;
        }

        try {
            const cartId = localStorage.getItem('cartId')
            const cartReq: CartReq = {
                 cartId:Number(cartId),
                 productDetailId: selectedDetail.id,
                 quantity:1
            }
            const response = await addToCart(cartReq)
            console.log(response);
            if (response.status === 200) {
                cartStore.saveCartPush(response.data)
                message.success("Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                message.error("Không thể thêm vào giỏ hàng!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            message.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 text-muted-foreground">
                <ol className="flex gap-2">
                    <li><a href="/" className="hover:text-primary">Trang chủ</a></li>
                    <li>/</li>
                    <li><a href="/mac-store" className="hover:text-primary">Mac Store</a></li>
                    <li>/</li>
                    <li>{productData.name}</li>
                </ol>
            </nav>

            <h1 className="text-2xl font-bold mb-8 mt-[50px]">{productData.name}</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <Image src={productData.imageUrl} alt={productData.name} width={600} height={400} className="w-full" />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                            <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span> Còn hàng
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-red-600">
                        {selectedDetail?.price ? selectedDetail.price.toLocaleString() + "đ" : "Chưa có giá"}
                    </div>

                    {/* Thông số kỹ thuật */}
                    <div className="space-y-2">
                        {selectedDetail && (
                            <>
                                <div className="flex gap-2"><Check className="h-5 w-5 text-green-500" /><span><strong>RAM:</strong> {selectedDetail.ram?.name || "N/A"}</span></div>
                                <div className="flex gap-2"><Check className="h-5 w-5 text-green-500" /><span><strong>Bộ nhớ:</strong> {selectedDetail.memory?.name || "N/A"}</span></div>
                                <div className="flex gap-2"><Check className="h-5 w-5 text-green-500" /><span><strong>Màn hình:</strong> {selectedDetail.displaySize?.name || "N/A"}</span></div>
                                <div className="flex gap-2"><Check className="h-5 w-5 text-green-500" /><span><strong>Màu sắc:</strong> {selectedDetail.color?.name || "N/A"}</span></div>
                            </>
                        )}
                    </div>

                    {/* Chọn cấu hình */}
                    <div>
                        <h3 className="font-medium mb-3">Cấu hình:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {productData.productDetails?.map((pd: any) => (
                                <Card key={pd.id} className={`cursor-pointer ${selectedDetail?.id === pd.id ? "border-red-500" : ""}`} onClick={() => setSelectedDetail(pd)}>
                                    <div className="font-medium">{pd.name}</div>
                                    <div className="text-red-600 font-medium">{pd.price.toLocaleString()}đ</div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Bảo hành */}
                    <div>
                        <h3 className="font-medium mb-3">Bảo Hành:</h3>
                        <Radio.Group value={warranty} onChange={(e) => setWarranty(e.target.value)}>
                            <Radio value="12 tháng">12 Tháng</Radio>
                            <Radio value="24 tháng">24 Tháng (+600,000đ)</Radio>
                        </Radio.Group>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <Button type="primary" className="bg-blue-600 text-white w-full flex items-center justify-center" icon={<ShoppingCart />}  onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                        <Button className="bg-gray-200 w-full flex items-center justify-center">Mua ngay</Button>
                    </div>

                    {/* Payment Options & Support */}
                    <Collapse accordion>
                        <Panel header="Ưu đãi thanh toán" key="1">
                            {paymentOptions.map((option, index) => (
                                <div key={index} className="flex gap-2"><Check className="h-5 w-5 text-green-500" /><span>{option}</span></div>
                            ))}
                        </Panel>
                        <Panel header="Hỗ trợ trực tuyến" key="2">
                            {supportHotlines.map((hotline, index) => (
                                <div key={index} className="flex items-center gap-2"><Phone className="h-5 w-5 text-green-500" /><span>{hotline.city}: </span><a href={`tel:${hotline.number}`} className="text-red-600 font-bold">{hotline.number}</a></div>
                            ))}
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}



const paymentOptions = ["Thanh toán thẻ ATM miễn phí", "Thanh toán thẻ MASTER, VISA +1.9%", "Trả Góp: Trả trước 30% + CCCD", "Trả Góp: Thẻ tín dụng lãi suất 0%"];
const supportHotlines = [{ city: "Hotline HCM", number: "0919.011.011" }, { city: "Hotline Hà Nội", number: "0964.600.600" }];
