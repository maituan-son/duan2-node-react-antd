import React, { useEffect, useState } from 'react'
import { Form, useParams } from "react-router-dom";
import { IProduct } from '../../types/products';
import { Button, Input, Select, Space } from 'antd';

type Props = {
    products: IProduct[]
}

const ProductDetail = ({ products }: Props) => {
    // Lấy ra id
    const { id } = useParams<{ id: string }>();

    const [product, setproduct] = useState<IProduct>();

    useEffect(() => {
        const concurren = products.find((pro) => pro._id === String(id))
        setproduct(concurren);

    }, [products]);
    
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

    return (
        <div className="container">
            <h1>{product?.name}</h1>
            <span>Thực Phẩm sạch</span>
            <hr />
            <div className="row">
                <div className="col text-center">
                    <img src={product?.image} width={350} alt="" />
                </div>
                <div className="col pt-10">
                    <div>
                        <div> Giá:
                            <span className=''>{Number(product?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <span><del>{Number("20000000").toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del></span>
                        </div>
                        <br />
                        <Space wrap>
                                <Select
                                defaultValue="lucy"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: '1kg', label: '1kg' },
                                    { value: '2kg', label: '2kg' },
                                    { value: '10kg', label: '10kg' },
                                    { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                                />
                        </Space>


                        <div className=''> Mô tả:  
                            {product?.description}
                        </div>
                        <br />
                        <div>
                        <Button type="primary"  className="antd-space">Mua ngay</Button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail