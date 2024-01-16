import React from "react";
import StyleProducts from "./Products.module.css";
import Icon from '@mui/icons-material/CategoryOutlined'

function Products() {
  return (
    <div className={StyleProducts.container}>
      <div className={StyleProducts.sideBar}>
        <section className={StyleProducts.sideBarTitle}>
          <Icon></Icon>
          <h1>Categories</h1>
        </section>

        <section className={StyleProducts.searchArticle}>
          <article
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
            }}
          >
            <h3>Brand</h3>
            <h3>Search ...</h3>
          </article>
        </section>

        <section className={StyleProducts.categoryArticle}>
          <article
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
            }}
          >
            <h3>Categories</h3>
            <div className={StyleProducts.checkBoxContainer}>
              <div className={StyleProducts.checkBoxLine}>
                <input
                  type="checkbox"
                  id="Eastern&Western"
                  name="Eastern&Western"
                  value="Eastern&Western"
                />
                <label for="Eastern&Western"> Eastern & Western</label>
              </div>
              <div className={StyleProducts.checkBoxLine}>
                <input
                  type="checkbox"
                  id="Eastern&Western"
                  name="Eastern&Western"
                  value="Eastern&Western"
                />
                <label for="Eastern&Western"> Eastern & Western</label>
              </div>
              <div className={StyleProducts.checkBoxLine}>
                <input
                  type="checkbox"
                  id="Eastern&Western"
                  name="Eastern&Western"
                  value="Eastern&Western"
                />
                <label for="Eastern&Western"> Eastern & Western</label>
              </div>
              <div className={StyleProducts.checkBoxLine}>
                <input
                  type="checkbox"
                  id="Eastern&Western"
                  name="Eastern&Western"
                  value="Eastern&Western"
                />
                <label for="Eastern&Western"> Eastern & Western</label>
              </div>
            </div>
          </article>
        </section>
      </div>

      <section className={StyleProducts.cards}>
        <h1>Cards</h1>
      </section>
    </div>
  );
}

export default Products;
