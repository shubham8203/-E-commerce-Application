
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Loginsignup from './pages/Loginsignup';
import Cart from './pages/Cart';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import banner_mens from './components/assets/Ecommerce_Assets/Assets/Frontend_Assets/banner_mens.png'
import banner_women from './components/assets/Ecommerce_Assets/Assets/Frontend_Assets/banner_women.png'
import banner_kids from './components/assets/Ecommerce_Assets/Assets/Frontend_Assets/banner_kids.png'


function App() {
  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop/>}></Route>
      <Route path='/mens' element={<ShopCategory banner={banner_mens} category="men"/>}></Route>
      <Route path='/womens' element={<ShopCategory banner={banner_women} category="women"/>}></Route>
      <Route path='/kids' element={<ShopCategory banner={banner_kids} category="kid"/>}></Route>
      <Route path="/product" element={<Product/>}>
          <Route path=":productId" elemnt={<Product/>}>

          </Route>
      </Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/login' element={<Loginsignup/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>

     
    </div>
  );
}
export default App;

