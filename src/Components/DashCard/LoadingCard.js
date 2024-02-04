import Loading from "../../Pages/Loading/Loading";
import Styles from "./DashCard.module.css";

const LoadingCard = () => {
  return (
    <div className={Styles.card}>
      <Loading />
    </div>
  );
};

export default LoadingCard;
