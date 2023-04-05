import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { addProduct, getAllProduct, removeProduct, updateProduct } from './api/product'
import AdminLayout from './components/layouts/AdminLayout'
import BaseLayout from './components/layouts/BaseLayout'
import AddProduct from './pages/admin/products/AddProduct'
import Dashboard from './pages/admin/Dashboard'
import ListProducts from './pages/admin/products/ListProducts'
import UpdateProduct from './pages/admin/products/UpdateProduct'
// import './App.css'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import ProductPage from './pages/ProductPage'
import { IProduct } from './types/products'
import Signin from './pages/users/Signin'
import Signup from './pages/users/Signup'
import { IUser } from './types/auth'
import { signin, signup } from './api/auth'
import { CreateCategory, RemoveCategory, getAllCategory, updateCategory } from './api/categories'
import ListCategory from './pages/admin/categories/ListCategory'
import AddCategory from './pages/admin/categories/AddCategory'
import UpdateCategory from './pages/admin/categories/UpdateCategory'
import { ICategory } from './types/category'

function App() {
  //======================== PRODUCTS ========================================
  // -Khai báo state là products và hàm cập nhật là setProducts với giá trị khởi tạo là 1 mảng rỗng
  const [products, setProducts] = useState<IProduct[]>([]);
  // Hàm uffect đc sử dụng để gọi hàm getAllProduct lấy dữ liệu sản phẩm thông qua getAll rồi lưu giá trị vào state
  useEffect(() => {
    (async () => {
      const { data } = await getAllProduct();

      const newData = data.products.map((product: any) => {
        return {
          key: product._id,
          ...product,
        }
      });
      setProducts(newData);
    })()
  }, [])

  //---------- Xóa
  const onHanleRemove = (_id: string) => {
    removeProduct(_id).then(() => {
      const newpro = products.filter((pro) => pro._id !== _id);
      setProducts(newpro);
    })
  }
  // -----------Thêm
  const onHanleAdd = (product: IProduct) => {
    addProduct(product)
      .then(() => {
        setProducts([...products, product]);
      })
  }
  //------------Cập nhật
  const onHanleUpdate = (product: IProduct) => {
    // console.log(product);

    updateProduct(product)
      .then(() => {
        setProducts(products.map((pro) => pro._id == product._id ? product : pro));
      }).catch(err => console.log(err))
  }
  // ===========================USER ========================================
  // -------------Đăng nhập
  const onHandleSignin = async (user: IUser) => {
    const { data } = await signin(user);
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    alert("Đăng nhập thành công");
  }
  // ------------Đăng ký
  const onHandleSignup = (user: IUser) => {
    signup(user).then(() => alert("Đăng ký thành công😍"));
  }
  // ================================= CATEGORY =========================================
  const [categories, setcategory] = useState<ICategory[]>([]);
  useEffect(() => {
    getAllCategory().then(({ data }) => setcategory(data.categories));
  }, [])

  //---------- Xóa
  const onHanleRemoveCate = (_id: string) => {

    RemoveCategory(_id).then(() => {
      const newpro = categories.filter((cate) => cate._id !== _id);
      setcategory(newpro);
    })
  }
  // -----------Thêm
  const onHanleAddCate = (category: ICategory) => {
    CreateCategory(category).then(() => {
      setcategory([...categories, category]);
    });
  }
  // -----------Cập nhật
  const onHanleUpdateCate = (category: ICategory) => {
    updateCategory(category).then(() => {
      setcategory(categories.map((cate) => cate._id == category._id ? category : cate))
    }).catch((error) => console.log(error)
    )
  }
  return (
    <div className="App container">
      <Routes>
        <Route path='/' element={< BaseLayout />} >
          <Route index element={<HomePage products={products} categories={categories} />} />
          <Route path='products' >
            <Route index element={<ProductPage products={products} categories={categories} />} />
            <Route path=':id' element={<ProductDetail products={products} />} />
          </Route>
          <Route path='signin' element={<Signin onSignin={onHandleSignin} />} />
          <Route path='signup' element={<Signup onSignup={onHandleSignup} />} />
        </Route>


        <Route path='admin' element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='products' >
            <Route index element={<ListProducts products={products} categories={categories} onRemove={onHanleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHanleAdd} categories={categories} />} />
            <Route path=':id/update' element={<UpdateProduct products={products} categories={categories} onUpdate={onHanleUpdate} />} />
          </Route>
          <Route path='categories' >
            <Route index element={<ListCategory categories={categories} products={products} onRemove={onHanleRemoveCate} />} />
            <Route path='add' element={<AddCategory onAdd={onHanleAddCate} products={products} />} />
            <Route path=':id/update' element={<UpdateCategory categories={categories} products={products} onUpdate={onHanleUpdateCate} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

// import React, { useEffect, useState } from 'react';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, MenuProps, Popconfirm, Skeleton } from 'antd';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { Space, Table, Image } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { getAllProduct, removeProduct } from './api/product';
// import { IProduct } from './types/products';
// import { Link } from 'react-router-dom';

// interface DataType {
//   key: string;
//   name: string;
//   price: number;
//   image: string;
//   categoryId: string;
//   description: string;
// }


// const { Header, Content, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps['items'] = [
//   {
//     key: 'dashboard',
//     icon: React.createElement(NotificationOutlined),
//     label: 'Dashboard',
//   },
//   {
//     key: 'products',
//     icon: React.createElement(UserOutlined),
//     label: 'Products',
//     children: [
//       {
//         key: `ListProduct`,
//         label: `ListProducts`,
//       },
//       {
//         key: `AddProduct`,
//         label: `AddProduct`,
//       }

//     ]
//   },
//   {
//     key: 'category',
//     icon: React.createElement(LaptopOutlined),
//     label: 'Category',
//     children: new Array(4).fill(null).map((_, index) => {
//       const subKey = index + 1;
//       return {
//         key: `sub${subKey}`,
//         label: `Category ${subKey}`,
//       };
//     }),
//   },

// ];

// const App = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const [products, setproduct] = useState<IProduct[]>([]);
//   const [loading, setloading] = useState(false);
//   useEffect(() => {
//     (async () => {
//       setloading(true);
//       const { data } = await getAllProduct();
//       const newdata = data.products.map((product: any) => {
//         return {
//           key: product._id,
//           ...product
//         }
//       });
//       setloading(false);
//       setproduct(newdata);

//     })()
//   }, [])

//   const onHandleDelete = (_id: string) => {
//     removeProduct(_id).then(() => {
//       const newpro = products.filter((pro) => pro._id !== _id);
//       setproduct(newpro);
//     })

//   }
//   const columns: ColumnsType<IProduct> = [
//     {
//       title: 'Id',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       key: 'image',
//       render: (record): any => {
//         console.log('record: ', record);
//         return <Image
//           width={200}
//           src={record}
//         />

//       }
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'CategoryId',
//       dataIndex: 'categoryId',
//       key: 'categoryId',
//     },

//     {
//       title: 'Action',
//       key: 'action',
//       render: (record) => {
//         return (
//           <Space size="middle">
//             <a href=''>Edit</a>
//             <Popconfirm
//               placement="topLeft"
//               title={"Bạn có chắc chắn muốn xóa"}
//               description={"Xóa rồi là không khôi phục được lại"}
//               onConfirm={() => onHandleDelete(record.key)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button type='primary' danger>Delete</Button>
//             </Popconfirm>
//           </Space>
//         )
//       }
//     },
//   ];


//   return (
//     <Layout>
//       <Header className="header">
//         <div className="logo" />
//         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
//       </Header>
//       <Layout>
//         <Sider width={200} style={{ background: colorBgContainer }}>
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             style={{ height: '100%', borderRight: 0 }}
//             items={items2}
//           />
//         </Sider>
//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item>
//           </Breadcrumb>
//           <Content
//             style={{
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//               background: colorBgContainer,
//             }}
//           >
//             {loading ? <Skeleton /> : <Table columns={columns} dataSource={products} />}

//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
