import { Outlet } from "react-router-dom";
import Footer from "../Layouts/Footer/Footer";
import Navbar from "../Layouts/Navbar/Navbar";

const Layout = ({children}) => {
    return (
        <>
          <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
          </div>
        </>
      );
}

export default Layout