import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { IProduct } from '../../types/products';
import { Button } from 'antd';

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