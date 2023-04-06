import React from 'react'
import { Carousel } from 'antd';

const slideshow = () => {
    const contentStyle: React.CSSProperties = {
        height: '530px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (

        <div>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}> <img src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/1/638159447645423123_F-H1_800x300.png" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}>  <img src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/1/638159356547375957_F-H1_800x300.png" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}> <img src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638159006091431304_F-H1_800x300.png" className="d-block w-100" alt="..." /></h3>
                </div>

            </Carousel>

        </div>
    )
}

export default slideshow