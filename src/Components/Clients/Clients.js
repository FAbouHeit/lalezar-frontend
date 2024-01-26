import Styles from "./Clients.module.css";
import img1 from "../../Assets/Adobe.webp";
import img2 from "../../Assets/BMW.png";
import img3 from "../../Assets/HP.jpg";
import img4 from "../../Assets/Hyundai.png";
import img5 from "../../Assets/IBM.png";
import img6 from "../../Assets/LG.webp";

const data = [
  { name: "Adobe", image: img1 },
  { name: "MW", image: img2 },
  { name: "HP", image: img3 },
  { name: "Hyundai", image: img4 },
  { name: "IBM", image: img5 },
  { name: "LG", image: img6 },
  { name: "Adobe", image: img1 },
  { name: "MW", image: img2 },
  { name: "HP", image: img3 },
  { name: "Hyundai", image: img4 },
  { name: "IBM", image: img5 },
  { name: "LG", image: img6 },
];
const Clients = () => {
  return (
    <section className={Styles.logos}>
      <div className={Styles.logoSlide}>
        {data.map((item, index) => {
          return <img key={index} src={item.image} alt={item.name} className={Styles.img}/>;
        })}
      </div>
    </section>
  );
};

export default Clients;
