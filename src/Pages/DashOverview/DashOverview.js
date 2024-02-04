import Styles from "./DashOvervire.module.css";
import RevenueChart from "../../Components/RevenueChart/RevenueChart";
import useApi from "../../Hooks/UseApi";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import TopProductsChart from "../../Components/TopProducts/TopProductsBar";
import DashCard from "../../Components/DashCard/DashCard";
import TopCountrisChart from "../../Components/CountrisChart/CountriesChart";
import LoadingCard from "../../Components/DashCard/LoadingCard";
import CategoryChart from "../../Components/CategoryChart/CategoryChart";
import UserChart from "../../Components/UserChart/UserChart";

const DashOverview = () => {
  const [option, setOption] = useState("monthly");
  const [productOption, setProductOption] = useState("sold");
  const [countryOption, setCountryOption] = useState("country");
  const [revenueData, setRevenueData] = useState();
  const [productData, setProductData] = useState();
  const [countriesData, setCountriesData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [infoData, setInfoData] = useState();
  const [userData, setUserData] = useState();
  const { loading, apiCall } = useApi();
  const [productPending, setProductPending] = useState(true);
  const [countriesPending, setCountriesPending] = useState(true);
  const [categoryPending, setCategoryPending] = useState(true);
  const [revenuePending, setRevenuePending] = useState(true);
  const [infoPending, setInfoPending] = useState(true);
  const [userPending, setUserPending] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setRevenuePending(true);
      const response = await apiCall({
        method: "post",
        url: "/dash/revenue",
        data: {
          option: option,
        },
      });

      setRevenueData(response);
      setRevenuePending(false);
    };

    fetchRevenueData();
  }, [option]);

  useEffect(() => {
    const fetchProductData = async () => {
      setProductPending(true);
      const response = await apiCall({
        method: "post",
        url: "dash/product",
        data: {
          option: productOption,
        },
      });
      setProductData(response);
      setProductPending(false);
    };

    fetchProductData();
  }, [productOption]);

  useEffect(() => {
    const fetchProductData = async () => {
      setCountriesPending(true);
      const response = await apiCall({
        url: `dash/countries`,
        data: {
          option: countryOption,
        },
        method: "post",
      });
      setCountriesData(response);
      setCountriesPending(false);
    };

    fetchProductData();
  }, [countryOption]);

  useEffect(() => {
    const fetchData = async () => {
      setInfoPending(true);
      const response = await apiCall({
        url: `dash/info`,
        method: "get",
      });
      setInfoData(response);
      setInfoPending(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setCategoryPending(true);
      const response = await apiCall({
        url: `dash/category`,
        method: "get",
      });
      setCategoryData(response);
      setCategoryPending(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setUserPending(true);
      const response = await apiCall({
        url: `dash/user`,
        method: "get",
      });
      setUserData(response);
      setUserPending(false);
    };

    fetchUserData();
  }, []);

  return (
    <div className={Styles.container}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Analytics Overview
      </Typography>
      <div className={Styles.cardContainer}>
        {!infoPending &&
          infoData.map((card, index) => {
            return (
              <DashCard
                title={card.title}
                number={card.number}
                key={index}
                icon={card.icon}
                index={index}
              />
            );
          })}
        {infoPending && (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}
      </div>
      <div className={Styles.charts}>
        <div className={Styles.left}>
          {revenuePending ? (
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "530px",
                alignItems: "center",
                backgroundColor: "rgb(231, 231, 231)",
                borderRadius: "10px",
              }}
            >
              <Loading />
            </span>
          ) : (
            <RevenueChart
              data={revenueData && revenueData}
              option={option}
              setOption={setOption}
            />
          )}

          <div className={Styles.middle}>
            <span className={Styles.product}>
              {productPending ? (
                <span
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    height: "450px",
                    alignItems: "center",
                    backgroundColor: "rgb(231, 231, 231)",
                    borderRadius: "10px",
                  }}
                >
                  <Loading />
                </span>
              ) : (
                <TopProductsChart
                  productOption={productOption}
                  setProductOption={setProductOption}
                  productData={productData && productData}
                />
              )}
            </span>
            <span className={Styles.product}>
              {countriesPending ? (
                <span
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    height: "450px",
                    alignItems: "center",
                    backgroundColor: "rgb(231, 231, 231)",
                    borderRadius: "10px",
                  }}
                >
                  <Loading />
                </span>
              ) : (
                <TopCountrisChart
                  countryOption={countryOption}
                  setCountryOption={setCountryOption}
                  countriesData={countriesData && countriesData}
                />
              )}
            </span>
          </div>
        </div>
        <div className={Styles.right}>
          {categoryPending ? (
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "450px",
                alignItems: "center",
                backgroundColor: "rgb(231, 231, 231)",
                borderRadius: "10px",
              }}
            >
              <Loading />
            </span>
          ) : (
            <span className={Styles.rightChart}>
              <CategoryChart categoryData={categoryData && categoryData} />
            </span>
          )}

          {userPending ? (
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "450px",
                alignItems: "center",
                backgroundColor: "rgb(231, 231, 231)",
                borderRadius: "10px",
              }}
            >
              <Loading />
            </span>
          ) : (
            <span className={Styles.rightChart}>
              <UserChart userData={userData && userData} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashOverview;
