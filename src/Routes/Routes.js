import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Home from "../Pages/Home/Home";
import ProductsPage from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ProductForm from "../Pages/ProductForm/ProductForm";
import Cart from "../Pages/Cart/Cart";
import BlogsPage from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import BlogForm from "../Pages/BlogForm/BlogForm";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import DashOverview from "../Pages/DashOverview/DashOverview";
import DashOrder from "../Pages/DashOrders/DashOrders";
import DashProduct from "../Pages/DashProducts/DashProducts";
import DashUser from "../Pages/DashUsers/DashUsers";
import UserForm from "../Pages/UserForm/UserForm";
import ProfilePage from "../Pages/Profile/Profile";
import ProfileEdit from "../Pages/ProfileEdit/ProfileEdit";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import NotFound from "../Pages/NotFound/NotFound";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";

const PrivatRoute = ({ element, roles }) => {
  const { user, checkUser } = useContext(AuthContext);

  while (checkUser) {
    if (user === null) {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/ProductsPage" exact element={<ProductsPage />} />
        <Route path="/ProductDetails" exact element={<ProductDetails />} />
        <Route path="/Cart" exact element={<Cart />} />
        <Route path="/BlogsPage" exact element={<BlogsPage />} />
        <Route path="/BlogDetails" exact element={<BlogDetails />} />
        <Route path="/PrivacyPolicy" exact element={<PrivacyPolicy />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/SignUp" exact element={<SignUp />} />
        <Route path="/Unauthorized" exact element={<Unauthorized />} />
        <Route
          path="/ProductForm"
          exact
          element={
            <PrivatRoute>
              <ProductForm />
            </PrivatRoute>
          }
        />
        <Route
          path="/BlogForm"
          exact
          element={
            <PrivatRoute>
              <BlogForm />
            </PrivatRoute>
          }
        />
        <Route
          path="/DashOverview"
          exact
          element={
            <PrivatRoute>
              <DashOverview />
            </PrivatRoute>
          }
        />
        <Route
          path="/DashOrder"
          exact
          element={
            <PrivatRoute>
              <DashOrder />
            </PrivatRoute>
          }
        />
        <Route
          path="/DashProduct"
          exact
          element={
            <PrivatRoute>
              <DashProduct />
            </PrivatRoute>
          }
        />
        <Route
          path="/DashUser"
          exact
          element={
            <PrivatRoute>
              <DashUser />
            </PrivatRoute>
          }
        />
        <Route
          path="/UserForm"
          exact
          element={
            <PrivatRoute>
              <UserForm />
            </PrivatRoute>
          }
        />
        <Route
          path="/ProfilePage"
          exact
          element={
            <PrivatRoute>
              <ProfilePage />
            </PrivatRoute>
          }
        />
        <Route
          path="/ProfileEdit"
          exact
          element={
            <PrivatRoute>
              <ProfileEdit />
            </PrivatRoute>
          }
        />
        <Route path="/*" exact element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
