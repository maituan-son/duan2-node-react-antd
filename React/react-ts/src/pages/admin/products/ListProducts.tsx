// conponents
import React from 'react';
import { IProduct } from '../../../types/products'
import { Image, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/category';
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Pagination } from 'antd';

// định nghĩa kiểu dữ liệu
type Props = {
    categories: ICategory[],
    products: IProduct[],
    onKeyWords: (keys: string) => void, 
    onRemove: (_id: string) => void 
}

const ListProducts = ({ products, onRemove, categories, onKeyWords }: Props) => { 
    // antd 
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff', 
            }}
        />
    );

    // các hàm xử lý
    // hàm tìm kiếm
    const onSearch = (value: string) => console.log(value); 
    const onHandleChange = (e: any) => {
        e.preventDefault();
        onKeyWords(e.target.value.toLowerCase());
    };
    // hàm xóa
    const onHandleRemove = (_id: string) => {
        onRemove(_id);
    }

    // dữ liệu đổ ra bảng
    const columns: ColumnsType<IProduct> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (record): any => {
                return (
                    <Image
                        width={200}
                        src={record}
                    />
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (record): any => {
                return record.slice(0, 25).concat("...");
            }
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (record): any => {
                console.log(categories.find(cate => cate._id === record));

                const catename = categories.find(cate => cate._id === record);
                return catename?.name

            }

        },
        {
            title: 'Action',
            key: 'action',
            render: (record) =>
            (
                <Space size="middle">
                    <button className='btn btn-warning'><Link to={"/admin/products/" + record._id + "/update"}><EditOutlined /></Link></button>
                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn muốn xóa"}
                        description={"Xóa là mất"}
                        onConfirm={() => onHandleRemove(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <Space direction="vertical">
                <Search
                    placeholder="Nhập tên sản phẩm"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={onSearch}
                    onChange={onHandleChange}
                />
            </Space>
            <Table columns={columns} dataSource={products} />

        </div >
    )
}

export default ListProducts