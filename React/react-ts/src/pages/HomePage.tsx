import React from 'react'
import slideshow from '../components/views/slideshow/slideshow'
import Footer from '../components/views/Footer'
import { IProduct } from '../types/products'
import { ICategory } from '../types/category'
import { Col, Divider, Row } from 'antd';


type Props = {
    products: IProduct[],
}

const HomePage = ({ products }: Props) => {
    const style: React.CSSProperties = { background: '', padding: '8px 0' };
    return (
        <div>
            {/* SLIDE SHOW */}
            {slideshow()}

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
                {products.map((pro, index) => {
                    return (
                        <Col key={index} span={6}>
                            <div style={style} className="gutter-row  shadow-hover">
                                <div className='text-center'>
                                    <a href={"/products/" + pro._id}><img src={pro.image} alt="" /></a>
                                </div>
                                <div className='shadow-sm p-3'>
                                    <a className='link-underline link-underline-opacity-0 text-black' href={"/products/" + pro._id}><h3>{pro.name}</h3></a>
                                    <span>{Number(pro.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> <br />
                                    <button className='btn btn-danger w-100 mt-2'><a className='link-underline link-underline-opacity-0 text-light' href={"/products/" + pro._id}>Xem thêm</a></button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default HomePage