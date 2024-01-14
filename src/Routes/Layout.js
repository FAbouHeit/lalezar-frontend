import Footer from "../Layouts/Footer/Footer";
import Navbar from "../Layouts/Navbar/Navbar";

const Layout = ({children}) => {
    return (
        <>
          <div>
            <Navbar/>
            {children}
            <Footer/>
          </div>
        </>
      );
}

export default Layout