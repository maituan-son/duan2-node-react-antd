import React from 'react'
import { IProduct } from '../../../types/products'

import { Image, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/category';
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';


type Props = {
    categories: ICategory[],
    products: IProduct[],
    onRemove: (_id: string) => void


}
const ListProducts = ({ products, onRemove, categories }: Props) => {
    console.log(categories);

    const onHandleRemove = (_id: string) => {
        onRemove(_id);
    }
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
            render: (record) => (
                <Space size="middle">
                    <button className='btn btn-warning'><Link to={"/admin/products/" + record._id + "/update"}><EditOutlined /></Link></button>
                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn muốn xóa"}
                        description={"Xóa là mất"}
                        onConfirm={() => onHandleRemove(record.key)}
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
            <Table columns={columns} dataSource={products} />
        </div>
    )
}

export default ListProducts