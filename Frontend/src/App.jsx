import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.scss'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Register from './Pages/RegisterAndLogin/Register';
import Login from './Pages/RegisterAndLogin/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAllUsers, setAuth } from './Store/AuthSlice';
import Cart from './Pages/Cart/Cart';
import Auth from './Auth/Auth';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import Category from './Pages/Category/Category';
import axios from 'axios';
import { setCart, setProducts } from './Store/ProductsSlice';
import UserDetails from './Pages/Dashboard/UserDetails/UserDetails';
import ProductDetails from './Pages/Dashboard/ProductDetails/ProductDetails';
import AddProduct from './Pages/Dashboard/ProductDetails/AddProduct/AddProduct';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import UserAuth from './Auth/UserAuth';
import ProductDisplay from './Pages/ProductDisplay/ProductDisplay';
import Cancel from './Pages/Payment/Cancel';
import UserDashboard from './Pages/Dashboard/UserDashboard/UserDashboard';
import Settings from './Pages/Dashboard/UserDashboard/Settings/Settings';
import Success from './Pages/Payment/Success';
import Search from './Pages/Search/Search';



// make the div flex and make the child of that div flex-1/flex-grow so that the child will take up entire remaining space no need to use height 100%


const App = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const getProductsData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/products/allProducts`)
    dispatch(setProducts(res?.data?.products))
  }


  const getUsers = async () => {
    try {
      const res = await axios(`${import.meta.env.VITE_API}/user/allUsers`);
      dispatch(setAllUsers(res?.data?.usersData))

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [products])

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.products);

  const getCart = async () => {
    const id = user?.user?._id;
    if (user?.user) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/user/getcart`, { id: id });
        // let existingCart = res?.data?.cart;
        let existingCart = res?.data?.cart;
        // since cart is by default configured sa writable: false so we need to make a copy of it and store in cartData we can't just do cartData = cart we need to make a copy of it by 
        let cartData = [...cart];

        // Below code checks if the existing cart that is coming from DB is equal to the cart that user had when the user wasn't logged in so if the both db's cart and cart user had before logging in has the same ID product the db's cart's quantity is increased and cartData array removes that specific product from it so below in the bottom existingCart can easily spread cartData without worrying about duplication of products

        if (JSON.stringify(existingCart) !== JSON.stringify(cart)) {
          for (let i = 0; i < existingCart.length; i++) {
            for (let j = 0; j < cartData?.length; j++) {
              if (existingCart[i].id === cartData[j].id) {
                existingCart[i].quantity += cartData[j].quantity;
                cartData.splice(j, 1);
              }
            }
          }

          existingCart = [...res?.data?.cart, ...cartData];
        }

        dispatch(setCart(existingCart))


      } catch (error) {
        console.log("Here", error);
      }
    }

  }


  useEffect(() => {
    getCart();
  }, [user?.user])


  const updateCart = async () => {
    const id = user?.user?._id;
    if (user?.user) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/user/setcart`, { id: id, cart: cart });

      } catch (error) {
        console.log("Here", error);
      }
    }

  }


  useEffect(() => {

    updateCart();

  }, [cart])



  useEffect(() => {

    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      dispatch(setAuth({ user: parseData.user, token: parseData.token }))

    }

    getProductsData();

  }, [])






  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer autoClose={1300} position='top-center' />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/display/:id' element={<ProductDisplay />} />
        <Route path='/search/:query' element={<Search />} />

        {/* Protecting the routes that we want the user to login first so that they can't access without loggin in */}
        {/* Whichever route user wants to go they have to go through Auth and then Auth will direct them to that route */}
        <Route path='/dashboard' element={<UserAuth />}>
          <Route path='user' element={<UserDashboard />} />
          <Route path='user/settings' element={<Settings />} />
        </Route>
        <Route path='/dashboard' element={<Auth />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/userdetails' element={<UserDetails />} />
          <Route path='admin/productdetails' element={<ProductDetails />} />
          <Route path='admin/productdetails/add' element={<AddProduct />} />
        </Route>

        {/* Categories */}
        <Route path='/category/:category' element={<Category />}>
          <Route path=':subCategory' element={<Category />} />
        </Route>

        <Route path='/payment/success' element={<Success />} />
        <Route path='/payment/cancel' element={<Cancel />} />


        <Route path='*' element={<PageNotFound />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
