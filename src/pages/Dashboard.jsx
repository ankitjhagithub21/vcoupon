import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Customers from './Customers'
import Orders from './Orders'
import AddCustomer from './AddCustomer'
import AddCoupon from './AddCoupon'
import Coupons from './Coupons'
import OrderDetails from './OrderDetails'
import Settings from './Settings'
import Footer from '../components/Footer'



const Dashboard = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customers' element={<Customers/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/order-details/:orderId' element={<OrderDetails/>}/>
        <Route path='/add' element={<AddCustomer/>}/>
        <Route path='/coupons' element={<Coupons/>}/>
        <Route path='/add-coupon' element={<AddCoupon/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Dashboard
