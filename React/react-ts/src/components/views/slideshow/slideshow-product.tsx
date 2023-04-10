import React from 'react'
import { Carousel } from 'antd';

const slideshowproduct = () => {
    const contentStyle: React.CSSProperties = {
        height: '354px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img src="https://theme.hstatic.net/1000282430/1000544102/14/banner-slider-3.jpg?v=2346" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}>  <img src="https://theme.hstatic.net/200000460455/1000877960/14/slide_1_img.jpg?v=385" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}>       <img src="https://theme.hstatic.net/1000282430/1000544102/14/banner-slider-3.jpg?v=2346" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                <h3 style={contentStyle}>       <img src="https://theme.hstatic.net/1000282430/1000544102/14/banner-slider-3.jpg?v=2346" className="d-block w-100" alt="..." /></h3>
                </div>
                <div>
                <h3 style={contentStyle}>       <img src="https://theme.hstatic.net/1000282430/1000544102/14/banner-slider-3.jpg?v=2346" className="d-block w-100" alt="..." /></h3>
                </div>

            </Carousel>
        
        </div>
    )
}

export default slideshowproduct