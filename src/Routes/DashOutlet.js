import { Outlet } from "react-router-dom";
import DashSidebar from "../Layouts/DashSidebar/DashSidebar";

const DashOutlet = ({children}) => {
    return (
        <>
            <DashSidebar/>
            <Outlet/>
        </>
      );
}

export default DashOutlet