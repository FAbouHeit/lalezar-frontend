import { Link, useNavigate } from "react-router-dom";
import styles from "./DashSidebar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import GroupIcon from "@mui/icons-material/Group";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useState } from "react";

const DashSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const ReturnHome = () => {
    navigate("/");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const listItems = [
    { number: 1 , item: "Overview", link: "/dashboard", icon: <QueryStatsIcon /> },
    { number: 2 , item: "Users", link: "/dashboard/user", icon: <GroupIcon /> },
    { number: 3 , item: "Products", link: "/dashboard/product", icon: <LocalMallIcon /> },
    { number: 4 , item: "Blogs", link: "/dashboard/blogs", icon: <AutoStoriesIcon /> },
    { number: 5 , item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarInner}>
        <div className={styles.sidebarHeader}>
          <button
            type="button"
            className={`${styles.sidebarBurger} ${styles.button} `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              style={{
                display: "flex",
              }}
            >
              {isOpen ? (
                <CloseIcon sx={{ color: "white" }} />
              ) : (
                <MenuIcon sx={{ color: "white" }} />
              )}
            </span>
          </button>
        </div>
        <div
          className={styles.sidebarMenu}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90vh",
            color: "white",
          }}
        >
          <span>
            {listItems.map((item) => (
              <Link
                to={item.link}
                key={item.number}
                style={{ textDecoration: "none" }}
              >
                <button
                  type="button"
                  className={`${styles.sidebarButton} ${styles.button} ${
                    selectedItem === item ? styles.selected : ""
                  }`}
                  tabIndex="0"
                  onClick={() => handleItemClick(item)}
                >
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </span>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    {item.item}
                  </p>
                </button>
              </Link>
            ))}
          </span>
          <span>
            <button
              className={`${styles.sidebarButton} ${styles.button}`}
              tabIndex="0"
              onClick={() => ReturnHome()}
            >
              <span>
                <HomeIcon
                  sx={{
                    color: "white",
                  }}
                />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Home
              </p>
            </button>
            <button
              className={`${styles.sidebarButton} ${styles.button}`}
              tabIndex="0"
            >
              <span>
                <LogoutIcon
                  sx={{
                    color: "white",
                  }}
                />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Logout
              </p>
            </button>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default DashSidebar;
