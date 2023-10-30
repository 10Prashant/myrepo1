import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegistrationComponent } from './app/modules/registration/RegistrationComponent';
import { LoginComponent } from './app/modules/login/LoginComponent';
import { HomeComponent } from './app/modules/home/HomeComponent';
import { OrderComponent } from './app/modules/order/OrderComponent';
import { CartComponent } from './app/modules/cart/CartComponent';
import { ProductComponent } from './app/modules/product/ProductComponent';
import { AdminPanelComponent } from './app/modules/admin/AdminPanelComponent';
import { ProductAdminComponent } from './app/modules/product/ProductAdminComponent';
import { CategoryAdminComponent } from './app/modules/category/CategoryAdminComponent';
import { AdminRegistrationComponent } from './app/modules/registration/AdminRegistrationComponent';
import { AdminLoginComponent } from './app/modules/login/AdminLoginComponent';
import { PayementComponent } from './app/modules/payment/PaymentComponent';
import { OrderAdminComponent } from './app/modules/order/OrderAdminComponent';
import { UserAdminComponent } from './app/modules/user/UserAdminComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegistrationComponent />} />
        <Route path='/admin-register' element={<AdminRegistrationComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/admin-login' element={<AdminLoginComponent />} />
        <Route path='/admin' element={<AdminPanelComponent />}>
          <Route path='/admin/product' element={<ProductAdminComponent />} />
          <Route path='/admin/category' element={<CategoryAdminComponent />} />
          <Route path='/admin/order' element={<OrderAdminComponent />} />
          <Route path='/admin/users' element={<UserAdminComponent />} />
        </Route>
        <Route path='/' element={<HomeComponent />}>
          <Route path='/order' element={<OrderComponent />} />
          <Route path='/cart' element={<CartComponent />} />
          <Route path='/' element={<ProductComponent />} />
          <Route path='/checkout' element={<PayementComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
