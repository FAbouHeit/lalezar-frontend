import Styles from "./Clients.module.css";
import img1 from "../../Assets/Adobe.webp";
import img2 from "../../Assets/BMW.png";
import img3 from "../../Assets/HP.jpg";
import img4 from "../../Assets/Hyundai.png";
import img5 from "../../Assets/IBM.png";
import img6 from "../../Assets/LG.webp";

const Clients = ({ data }) => {
  return (
    <section className={Styles.logos}>
      <div className={Styles.logoSlide}>
        {data.map((item, index) => {
          return (
            <span
            className={Styles.span}
            key={index}>
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
    </section>
  );
};

export default Clients;
