import Styles from './Blogs.module.css';
import img1 from './1.avif';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './land.avif';
import img5 from './port.jpeg';
import BlogCard from '../../Components/BlogCard/BlogCard';

export default function Blogs() {
  return (

    <article className={Styles.blogsContainer}>
        <main className={Styles.blogsMain}>
            <figure className={Styles.blogsHero}>
                <div className={Styles.centeredImage}>
                    <picture>
                        {/* <source srcSet={img1} media="(max-width: 500px)" />
                        <source srcSet={img2} media="(max-width:1000px)" /> */}
                        <source srcSet={img5} media="(orientation: portrait)" />
                        <source srcSet={img4} media="(orientation: landscape)" />

                        <img src={img3} alt="Descriptive Alt Text" />
                    </picture>
                </div>
                <div className={Styles.blogsTitleContainer}>
                    <span className={Styles.selectedBlogSpiceName}>Spice</span>
                   <h1 className={Styles.blogsTitle}>This is my new title! check out how long I can be :/</h1>
                   <div className={Styles.continueContainer}>
                        <p className={Styles.selectedBlogDate}>15.2.3300</p>
                        <span className={Styles.continueButton}>Continue reading</span>
                   </div>
                </div>
            </figure>
            <h2 className={Styles.latestPosts}>Latest Posts:</h2>
            <section className={Styles.blogsCardContainer}>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
            </section>
            <button className={Styles.viewMoreButton}>View More</button>
        </main>
    </article>
  );
}
