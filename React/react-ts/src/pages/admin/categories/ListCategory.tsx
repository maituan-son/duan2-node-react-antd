import { ICategory } from '../../../types/category'
import { Button, Image, message, Popconfirm } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../types/products';
import { useEffect, useState } from 'react';
type Props = {
    categories: ICategory[],
    products: IProduct[],
    onRemove: (_id: string) => void
}



const ListCategory = ({ categories, products, onRemove }: Props) => {
    const HandleDelete = (_id: string) => {
        onRemove(_id);
    }
    const columns: ColumnsType<ICategory> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (record): any => {
                return < Image width={200} src={record} />
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn btn-warning'><Link to={"/admin/categories/" + record._id + "/update"}>Sửa</Link></button>
                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn xóa"}
                        description={"Xóa rồi là mất"}
                        onConfirm={() => HandleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                </Space >
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={categories} />;
        </div>
    )
}

export default ListCategory