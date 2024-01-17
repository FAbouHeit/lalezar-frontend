import React, { useEffect, useState } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";

const Products = () => {
  const [sidePanelWidth, setSidePanelWidth] = useState(250);

  const openNav = () => {
    setSidePanelWidth(250);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  useEffect(()=>{
    function updateSideBar() {
      if (window.innerWidth > 960) {
        setSidePanelWidth(250)
      }
      else{
        setSidePanelWidth(0)
      }
    }
  
    window.addEventListener("resize", updateSideBar);
    updateSideBar();
  
    return () => {
      window.removeEventListener("resize", updateSideBar);
    };
  },[])

  return (
    <>
      <div
        id="mySidepanel"
        className={StyleProducts.sidepanel}
        style={{
          width: sidePanelWidth + "px",
          height: "100%",
          marginTop: "90px",
        }}
      >
        <a
          href="#"
          className={StyleProducts.closebtn}
          onClick={closeNav}
        >
          &times;
        </a>

        <div>
          <section className={StyleProducts.sideBarTitle}>
            <Icon></Icon>
            <h1>Categories</h1>
          </section>
          <section className={StyleProducts.searchArticle}>
            <article>
              <h3>Brand</h3>
              <h3>Search ...</h3>
            </article>
          </section>

          <section className={StyleProducts.categoryArticle}>
            <article>
              <h3>Categories</h3>
              <div className={StyleProducts.checkBoxContainer}>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>

      <button className={StyleProducts.openbtn} onClick={openNav}>
        &#9776;
      </button>

      <div style={{ marginLeft: sidePanelWidth + "px" ,transition: "margin-left 0.5s" }}>
        <h2>Collapsed Sidepanel</h2>
        <p>Content...</p>
      </div>
    </>
  );
};

export default Products;
