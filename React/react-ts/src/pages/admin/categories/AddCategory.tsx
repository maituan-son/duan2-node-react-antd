// components   
import { ICategory } from '../../../types/category' 
import { useNavigate } from 'react-router-dom' 
import { Button, Form, Input, Select } from 'antd';
import { IProduct } from '../../../types/products';

// kiểu dữ liệu
type Props = {
    products: IProduct[],
    onAdd: (category: ICategory) => any
}

const AddCategory = ({ onAdd, products }: Props) => {
    // antd
    const { Option } = Select;
    const [form] = Form.useForm();
    // Điều hướng
    const navigate = useNavigate();

    // hàm xử lý
    const onFinish = (data: any) => {
        onAdd(data);
        navigate("/admin/categories");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <h1 className='text-center'>Thêm loại</h1>
            <Form
                name="control-hooks"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item
                    label="Category name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Category name!' }]}
                >
                    <Input autoComplete="name" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your Image!' }]}
                >
                    <Input autoComplete="image" />
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

export default AddCategory