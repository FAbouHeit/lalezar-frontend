import { useState } from "react";
import Styles from "./BlogCard.module.css";
import { motion } from "framer-motion";
import dateConverter from "../../Utils/DateConverter.js";
import { Link, useResolvedPath } from "react-router-dom";
import image1 from "./2.jpg";

export default function BlogCard({ element }) {
  const [hovered, setHovered] = useState(false);
  const url = useResolvedPath("").pathname;

  return (
    <motion.div
      className={Styles.blogCardContainer}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/blogs/${element.slug}`} className={Styles.linkStyles}>
        <motion.div
          className={Styles.blogCardImage}
          transition={{ duration: 0.2 }}
        >
          <img src={`${process.env.REACT_APP_IMAGE_PATH}${element.images[0]}`} width={'100%'} />
        </motion.div>
        <h2 className={Styles.blogCardTitle}>{element.title_en}</h2>
        <p className={Styles.blogCardDate}>
          {dateConverter(element.updatedAt)}
        </p>
      </Link>
    </motion.div>
  );
}
