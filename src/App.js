import { lazy, useEffect, useState } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shop from "./components/Shop";
import Body from "./components/Body";
import Header from "./components/Header";
import Cart from "./components/Cart";
import VeiwProduct from "./components/VeiwProduct";
import Cookies from "js-cookie";
import MyOrders from "./components/MyOrders";
import Footer from "./components/Footer";
import CartSummary from "./components/CartSummary";
import OrderSuccess from "./components/OrderSuccess";
import LogOut from "./components/LogOut";

const Agent = lazy(()=>import('./components/Agent'));

const App = () => {
  if(!Cookies.get('userInfo')){
    Cookies.set("userInfo",JSON.stringify({
      accountIdOnAuth:null,
      accountTypeOnAuth:null,
      loggedIn:false,}),{
      expires:7
    });
  }
  const [data] = useState({...JSON.parse(Cookies.get('userInfo'))});
  const Router = createBrowserRouter([
    {
      path:"/",
      element:<Body />,
      errorElement:
      <>
        <Header/>
        <Home />
        <Footer />
      </>,
      children:[
          {path:"/",element:<Home />},
          {path:"/cart",element:<Cart />},
          {path:"/shop",element:<Shop />},
          {path:"/myorders",element:<MyOrders />},
          {path:"/user",element:<Auth loginFor='agent'/>},
          {path:"/shop/:id",element:<VeiwProduct />},
          {path:"/Agent",element:<Agent />},
          {path:"/dealer",element:<Auth loginFor='dealer'/>},
          {path:"/login",element:<Auth loginFor='user'/>},
          {path:"/cart/cartSummary",element:<CartSummary />},
          {path:"/addProduct",element:<Agent />},
          {path:"/logout",element:<LogOut />},
          {path:"/ordersuccess",element:<OrderSuccess />},
      ]
    },
  ]);
  useEffect(() =>{
    (Cookies.get('userInfo')!==JSON.stringify(data)) && Cookies.set("userInfo",JSON.stringify(data),{
      expires:7
    });
},[data,Cookies.get('userInfo')])
return (
        <div className="h-full bg-[#0a0f2b] select-none">
          <RouterProvider router={Router} />
        </div>
  )
}

export default App;
