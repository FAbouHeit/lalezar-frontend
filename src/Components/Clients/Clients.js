import Styles from "./Clients.module.css";
import img1 from "../../Assets/Adobe.webp";
import img2 from "../../Assets/BMW.png";
import img3 from "../../Assets/HP.jpg";
import img4 from "../../Assets/Hyundai.png";
import img5 from "../../Assets/IBM.png";
import img6 from "../../Assets/LG.webp";

const Clients = ({ data, isPending, isError }) => {
  return (
    <section className={Styles.logos}>
      {isPending ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "700",
            }}
          >
            Loading ...
          </p>
        </div>
      ) : isError ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "red",
              fontWeight: "700",
            }}
          >
            An Error Occured
          </p>
        </div>
      ) : (
        <div className={Styles.logoSlide}>
          {data.map((item, index) => {
            return (
              <span className={Styles.span} key={index}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_PATH}${item.image}`}
                  alt={item.name}
                  className={Styles.img}
                />
                <p>{item.name}</p>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Clients;
