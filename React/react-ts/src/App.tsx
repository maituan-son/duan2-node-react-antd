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
    console.log(categories);

    console.log(category);

    CreateCategory(category).then(() => {
      setcategory([...categories, category]);
    });
  }
  // -----------Cập nhật
  const onHanleUpdateCate = (category: ICategory) => {
    console.log(category);

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
