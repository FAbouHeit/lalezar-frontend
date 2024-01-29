import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Styles from "./ChooseUs.module.css";

const ChooseUs = () => {
  const data = [
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
  ];
  return (
    <article className={Styles.container}>
      {data.map((item , index) => {
        return (
          <section key={index} className={Styles.card}>
            <div className={Styles.rotate}>
            <div className={Styles.front}>
              <span className={Styles.icon}>{item.icon}</span>
              <h3 className={Styles.title}>{item.title}</h3>
            </div>
            <p className={`${Styles.text} ${Styles.back}`}>{item.text}</p>
            </div>
          </section>
        );
      })}
    </article>
  );
};

export default ChooseUs;
