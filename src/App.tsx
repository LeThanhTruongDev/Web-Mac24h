import SideBar from './components/SideBar';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import UserManager from './pages/admin/user_manager/UserManager';
import Ram from './pages/admin/DetailManagement/compomentRam/Ram';
import SizeManager from './pages/admin/DetailManagement/compomentSize/SizeManager';
import MemoryManager from './pages/admin/DetailManagement/compomentMemory/MemoryManager';
import ColorManager from './pages/admin/DetailManagement/compomentColor/ColorManager';
import ProductManager from './pages/admin/products/ProductManager';
import CategoryManager from './pages/admin/DetailManagement/compomentCategory/CategoryManager';
import HomePage from './pages/user/HomePage';
import MacStore from './pages/user/components/macstore';
import NavBar from './pages/user/components/NavBar';
import Footer from './pages/user/components/footer';
import RegistrationForm from './pages/auth/registration-form';
import LoginForm from './pages/auth/login-form';
import ProductPage from './pages/user/components/product/product-detail';
import PaymentPage from './pages/user/components/pay/payment-page';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route cho trang user  */}
        
        <Route
          path="/*"
          element={
            <div>
              <NavBar />
              <div style={{ marginTop: '20px' }}>
                <Routes>
                  <Route path="/user" element={<HomePage />} />
                  <Route path="/mac-store" element={<MacStore />} />
                  <Route path="/" element={<Navigate to="/user" />} />
                  <Route path="/register" element ={<RegistrationForm />} />
                  <Route path="/login" element ={<LoginForm />} />
                  <Route path="/product-detail/:id" element ={<ProductPage />} />
                  <Route path="/payment" element ={<PaymentPage />} />

                </Routes>
              </div>
              <Footer/>
            </div>
          }
        />
        

        {/* Route cho admin */}
        <Route
          path='/admin/*'
          element={
            <div className='h-full w-screen flex flex-row'>
              <SideBar />
              <div
                className='screen w-full '
                style={{
                  margin: '20px',
                }}
              >
                <Routes>
                  <Route path='/user-manager' element={<UserManager />} />
                  <Route path='/ram' element={<Ram />} />
                  <Route path='/size' element={<SizeManager />} />
                  <Route path='/memory' element={<MemoryManager />} />
                  <Route path='/color' element={<ColorManager />} />
                  <Route path='/product' element={<ProductManager />} />
                  <Route path='/category' element={<CategoryManager />} />
                  <Route path='/' element={<Navigate to='/home' />} />
                 
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
