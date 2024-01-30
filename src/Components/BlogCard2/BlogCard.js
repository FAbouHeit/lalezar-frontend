import { Button } from "@mui/material";
import Styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, image, description, slug }) => {
  const navigate = useNavigate();

  const createMarkup = () => {
    return { __html: description };
  };
  return (
    <section className={Styles.container}>
      <img
        src={`${process.env.REACT_APP_IMAGE_PATH}${image}`}
        alt=""
        className={Styles.img}
      />
      <div className={Styles.bottom}>
        <span className={Styles.bottomFirst}>
          <h3 className={Styles.title}>{title}</h3>
          <span className={Styles.btn1}>
            <Button
              onClick={() => navigate(`/blogs/${slug}`)}
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
        <div
          className={Styles.p}
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
        <span className={Styles.btn2}>
          <Button
            onClick={() => navigate(`/blogs/${slug}`)}
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
