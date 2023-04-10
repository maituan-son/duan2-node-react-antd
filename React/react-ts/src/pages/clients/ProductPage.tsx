import React from 'react'
import slideshowproduct from '../../components/views/slideshow/slideshow-product'
import { IProduct } from '../../types/products'
import { ICategory } from '../../types/category'
import { Col, Divider, Row } from 'antd';
import SearchForm from '../../components/views/Search';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Search from 'antd/es/input/Search';

type Props = {
    products: IProduct[],
    categories: ICategory[],
}

const ProductPage = ({ products, categories }: Props) => {
    const style: React.CSSProperties = { background: '', padding: '8px 0' };

    const onSearch = (value: string) => console.log(value);

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    return (
        <div>
            {slideshowproduct()}
            <Search
                placeholder="Nhập tên sản phẩm"
                enterButton="Tìm kiếm"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
            />
            <div className="container mt-3">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
                    {categories.map((cate, index) => {
                        return (
                            <Col key={index} span={6} className="col-md-2  shadow-hover border  text-center rounded-start">
                                <div style={style} className="gutter-row ">
                                    <a href='' className=' pt-3 link-underline link-underline-opacity-0 bg-white'>
                                        {/* <img  className='border  bg-secondary-subtle p-3 rounded-circle' src={cate.image}  width={100} /> */}
                                    </a>
                                    <a href='' className=' p-3 link-underline link-underline-opacity-0 text-center '>
                                        <h5 className='text-black'>{cate.name}</h5>
                                    </a>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                <div className='my-3'>
            <img src="https://theme.hstatic.net/1000282430/1000544102/14/banner-slider-3.jpg?v=2346" className="d-block w-100" alt="..." />
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
                    {products.map((pro, index) => {
                        return (
                            <Col key={index} span={6}>
                                <div style={style} className="gutter-row  shadow-hover">
                                    <div className='text-center'>
                                        <a href={"/products/" + pro._id}><img src={pro.image} width={300} /></a>
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
        </div>
    )
}

export default ProductPage