import React from 'react'
import { IProduct } from '../../../types/products'

import { Image, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';


type Props = {
    products: IProduct[],
    onRemove: (_id: string) => void


}
const ListProducts = ({ products, onRemove }: Props) => {
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
                console.log(record);

                return record;
            }

        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn btn-warning'><Link to={"/admin/products/" + record._id + "/update"}>Edit</Link></button>
                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn muốn xóa"}
                        description={"Xóa là mất"}
                        onConfirm={() => onHandleRemove(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger>Xóa</Button>
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