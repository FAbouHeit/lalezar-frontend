import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Home from "../Pages/Home/Home";
import Outlet from "../Routes/Outlet.js";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import BlogsPage from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import DashOverview from "../Pages/DashOverview/DashOverview";
import DashOrder from "../Pages/DashOrders/DashOrders";
import DashProducts from "../Pages/DashProducts/DashProducts";
import DashUser from "../Pages/DashUsers/DashUsers";
import ProfilePage from "../Pages/Profile/Profile";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import NotFound from "../Pages/NotFound/NotFound";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import Products from "../Pages/Products/Products.js";
import ContactUs from "../Pages/ContactUs/ContactUs.js";
import AboutUs from "../Pages/AboutUs/AboutUs.js";
import DashBlogs from "../Pages/DashBlogs/DashBlogs.js";
import DashOutlet from "./DashOutlet.js";

const PrivatRoute = ({ element, roles }) => {
  const { user, checkUser } = useContext(AuthContext);

  while (checkUser) {
    if (!user) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
          }}
        >
          Loading...
        </div>
      );
    } else {
      if (user && roles && roles.includes(user.role)) {
        return element;
      } else {
        return <Navigate to="/unauthorized" />;
      }
    }
  }
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ProductsPage" element={<Products />} />
        <Route path="/ProductDetails/:slug" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Blogs" element={<BlogsPage />} />
        <Route path="/Blogs/:slug" element={<BlogDetails />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/SignUp" exact element={<SignUp />} />
      </Route>

      <Route path="/Unauthorized" exact element={<Unauthorized />} />
      <Route path="/" element={<DashOutlet />}>
        <Route
          path="/dashboard/blogs"
          exact
          element={
            <PrivatRoute>
              <DashBlogs />
            </PrivatRoute>
          }
        />
        <Route
          path="/dashboard"
          exact
          element={
            <PrivatRoute>
              <DashOverview />
            </PrivatRoute>
          }
        />
        <Route
          path="/dashboard/order"
          exact
          element={
            <PrivatRoute>
              <DashOrder />
            </PrivatRoute>
          }
        />
        <Route
          path="/dashboard/product"
          exact
          element={
            <PrivatRoute>
              <DashProducts />
            </PrivatRoute>
          }
        />
        <Route
          path="/dashboard/user"
          exact
          element={
            <PrivatRoute>
              <DashUser />
            </PrivatRoute>
          }
        />
      </Route>
      <Route
        path="/ProfilePage"
        exact
        element={
          <PrivatRoute>
            <ProfilePage />
          </PrivatRoute>
        }
      />
      <Route path="/*" exact element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
