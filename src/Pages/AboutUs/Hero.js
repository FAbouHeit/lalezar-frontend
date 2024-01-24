import Styles from "./Hero.module.css";
import img from "../../Assets/aboutUs.jpg";
const Hero = () => {
  return (
    <article className={Styles.blogsContainer}>
      <main className={Styles.blogsMain}>
        <figure className={Styles.blogsHero}>
          <div className={Styles.centeredImage}>
            <picture>
              <source srcSet={img} media="(orientation: portrait)" />
              <source srcSet={img} media="(orientation: landscape)" />

              <img src={img} alt="Descriptive Alt Text" />
            </picture>
          </div>
          <h1 className={Styles.blogsTitle}>
            Providing the best experience to make your{" "}
            <span className={Styles.span}>Online Shopping</span>
          </h1>
        </figure>
      </main>
    </article>
  );
};

export default Hero;
