import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import {HelmetProvider} from "react-helmet-async"
import {Provider} from "react-redux";
import store from './Store';
import reportWebVitals from './reportWebVitals';
import Privateroutes from './components/Privateroutes';
import Homescreen from './screen/Homescreen';
import Productscreen from './screen/Productscreen';
import Cartscreen from './screen/Cartscreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import Shippingscreen from './screen/Shippingscreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrder from './screen/PlaceOrder';
import OrderScreen from './screen/OrderScreen';
import Success from './screen/Successscreen';
import ProfileScreen from './screen/ProfileScreen';
import Adminroutes from './components/Adminroutes';
import Productslist from './screen/Admin/Productslist';
import Orderlist from './screen/Admin/Orderlist';
import EditProductScreen from './screen/Admin/EditProductScreen';
import Userslist from './screen/Admin/Userslist';
import EditUser from './screen/Admin/EditUser';
import ReviewScreen from './screen/ReviewScreen';
import GetReview from './screen/GetReview';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
      <Route path='/' index={true} element={<Homescreen/>}></Route>
      <Route path='/page/:pageNumber'element={<Homescreen/>}></Route>
      <Route path='/search/:keyword' element={<Homescreen/>}></Route>
      <Route path='/product/:id' element={<Productscreen/>}></Route>
      <Route path='/cart' element={<Cartscreen/>}></Route>
      <Route path='/login' element={<LoginScreen/>}></Route>
      <Route path='/register' element={<RegisterScreen/>}></Route>
     

      <Route path='' element={<Privateroutes/>}>
          <Route path='/shipping' element={<Shippingscreen/>}></Route>
          <Route path='/payment' element={<PaymentScreen/>}></Route>
          <Route path='/placeorder' element={<PlaceOrder/>}></Route>
          <Route path='/order/:id' element = {<OrderScreen/>}></Route>
          <Route path='/finalpage' element={<Success/>}></Route>
          <Route path='/profile' element={<ProfileScreen/>}></Route>
          <Route path='/products/:id/review' element={<ReviewScreen/>}></Route>
          <Route path='/products/:id/review/view' element={<GetReview/>}></Route>
      </Route>

      <Route path='' element={<Adminroutes/>}>
        <Route path='/admin/productslist' element={<Productslist/>}></Route>
        <Route path='/admin/productlist/:id/edit' element={<EditProductScreen/>}></Route>
        <Route path='/admin/userslist' element={<Userslist/>}></Route>
        <Route path='/admin/userslist/:id/edit' element={<EditUser/>}></Route>
        <Route path='/admin/orderslist' element={<Orderlist/>}></Route>

          
      </Route>
    
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
   <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a functions
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
