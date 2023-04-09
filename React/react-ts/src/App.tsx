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
import HomePage from './pages/clients/HomePage'
import ProductDetail from './pages/clients/ProductDetail'
import ProductPage from './pages/clients/ProductPage'
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
import { useNavigate } from 'react-router-dom';

function App() {

  // -Khai báo state là products và hàm cập nhật là setProducts với giá trị khởi tạo là 1 mảng rỗng
  const [products, setProducts] = useState<IProduct[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [categories, setcategory] = useState<ICategory[]>([]);

  //======================== PRODUCTS ========================================
  //  Lấy tất cả dữ liệu sản phẩm
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllProduct(keywords);
        // const newData = data.productResponse.map((product: any) => {
        //   return {
        //     key: product._id,
        //     ...product,
        //   }
        // });
        // console.log(newData);
        setProducts(data.productResponse.docs);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [keywords])

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
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Đăng nhập thành công");

  }
  // ------------Đăng ký
  const onHandleSignup = (user: IUser) => {
    signup(user).then(() => alert("Đăng ký thành công😍"));
  }
  // ================================= CATEGORY =========================================

  // Lấy tất cả danh sách danh mục
  useEffect(() => {
    (async () => {
      const { data } = await getAllCategory(keywords);
      setcategory(data.categoryResponse.docs)
    })()

  }, [keywords])

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
    <div className="App">
      <Routes>
        <Route path='/' element={< BaseLayout />} >
          <Route index element={<HomePage products={products} />} />
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
            <Route index element={<ListProducts products={products} onKeyWords={setKeywords} categories={categories} onRemove={onHanleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHanleAdd} categories={categories} />} />
            <Route path=':id/update' element={<UpdateProduct products={products} categories={categories} onUpdate={onHanleUpdate} />} />
          </Route>
          <Route path='categories' >
            <Route index element={<ListCategory onKeyWords={setKeywords} categories={categories} products={products} onRemove={onHanleRemoveCate} />} />
            <Route path='add' element={<AddCategory onAdd={onHanleAddCate} products={products} />} />
            <Route path=':id/update' element={<UpdateCategory categories={categories} products={products} onUpdate={onHanleUpdateCate} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
