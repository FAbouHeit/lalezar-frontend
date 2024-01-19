import { Button } from "@mui/material";
import Styles from "./BlogCard.module.css";

const BlogCard = ({ title, image, description }) => {
  return (
    <section className={Styles.container}>
      <img src={image} alt="" className={Styles.img} />
      <div className={Styles.bottom}>
        <span className={Styles.bottomFirst}>
          <h3 className={Styles.title}>{title}</h3>
          <span className={Styles.btn1}>
            <Button
              sx={{
                bgcolor: "#c86823",
                color: "white",
                border: "1.5px solid transparent",
                ":hover": {
                  border: "1.5px solid #c86823",
                },
              }}
            >
              Read more
            </Button>
          </span>
        </span>
        <p className={Styles.p}>{description}</p>
        <span className={Styles.btn2}>
          <Button
            sx={{
              bgcolor: "#c86823",
              color: "white",
              border: "1.5px solid transparent",
              ":hover": {
                border: "1.5px solid #c86823",
              },
            }}
          >
            Read more
          </Button>
        </span>
      </div>
    </section>
  );
};

export default BlogCard;
