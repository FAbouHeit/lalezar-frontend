import Styles from "./DashCard.module.css";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupIcon from "@mui/icons-material/Group";

const DashCard = ({ index, title, number }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.left}>
        <p className={Styles.title}>{title}</p>
        <p className={Styles.number}>{number}</p>
      </div>
      <span className={Styles.icon}>
        {index === 0 ? (
          <PaidIcon />
        ) : index === 1 ? (
          <LocalMallIcon />
        ) : index === 2 ? (
          <ShoppingCartIcon />
        ) : index === 3 ? (
          <GroupIcon />
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

export default DashCard;
