import React, { useEffect } from 'react'
import { ICategory } from '../../../types/category'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Button, Form, Input, Select } from 'antd';
import { IProduct } from '../../../types/products';
import type { FormInstance } from 'antd/es/form';
const { Option } = Select;


type Props = {
    categories: ICategory[],
    products: IProduct[],
    onUpdate: (category: ICategory) => void
}

const UpdateCategory = ({ categories, onUpdate, products }: Props) => {

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const concurren = categories.find((cate) => cate._id === id);
        console.log(concurren);

        if (concurren) {
            formRef.current?.setFieldsValue(concurren);
        }
    }, [categories])
    const formRef = React.useRef<FormInstance>(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (data: any) => {
        onUpdate(data);
        navigate("/admin/categories")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
        }
    };
    return (
        <div>
            <h1 className='text-center'>Update Category</h1>
            <Form
                name="control-hooks"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                ref={formRef}
            >
                <Form.Item name="products" label="Products" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {products.map((pro, index) => {
                            return (
                                <Option key={index} value={pro._id}>{pro.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Category name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your Image!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCategory