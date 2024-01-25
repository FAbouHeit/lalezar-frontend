import Styles from './Blogs.module.css';
// import defaultPort from './port.jpeg';
import defaultLand from '../../Assets/blogHero.jpeg'
import defaultPort from '../../Assets/blogsHeroPort.jpg'
import BlogCard from '../../Components/BlogCard/BlogCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blogs() {

    const [latestBlog, setLatestBlog] = useState({})

    const { isPending: isBlogPending, error: blogError, data: blogData } = useQuery({
        queryKey: ["blogData"],
        queryFn: async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog`);
            if (res.data.length > 0) {
              setLatestBlog(res.data[0]);
            }
            return res.data;
          } catch (error) {
            console.error("Error fetching blog:", error);
            throw error; // Re-throw the error to let React Query handle it
          }
        },
      });


      // const { isPending: isOtherPending, error: otherError, data: otherData } = useQuery({        queryKey: ["repoData"],
      // queryKey: ["commentData"],  
      // queryFn: async () => {
      //     try {
      //       const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog/one`, { slug });
      //       console.log("fetched blog res.data: ",res.data);
      //       return res.data;
      //     } catch (error) {
      //       console.error("Error fetching blog:", error);
      //       throw error; // Re-throw the error to let React Query handle it
      //     }
      //   },
      // });


  return (
    <>
    {blogData ? 
    <article className={Styles.blogsContainer}>
        <main className={Styles.blogsMain}>
        <Link 
         to={`/blogs/${latestBlog.slug}`}
         className={Styles.linkStyles}
        >
            <figure className={Styles.blogsHero}>
                <div className={Styles.centeredImage}>
                    <picture>
                        <source srcSet={defaultPort} media="(orientation: portrait)" />
                        <source srcSet={defaultLand} media="(orientation: landscape)" />
                        <img src={defaultLand} alt="Descriptive Alt Text" />
                    </picture>
                </div>
                <div className={Styles.blogsTitleContainer}>
                    <span className={Styles.selectedBlogSpiceName}>Spice</span>
                   <h1 className={Styles.blogsTitle}>{latestBlog.title_en}k owj ojowj dojwojdowjdowj dowjod jwo</h1>
                   <div className={Styles.continueContainer}>
                        <p className={Styles.selectedBlogDate}>15.2.3300</p>
                        <span className={Styles.continueButton}>Continue reading</span>
                   </div>
                </div>
            </figure>
          </Link>
            <h2 className={Styles.latestPosts}>Latest Posts:</h2>
            <section className={Styles.blogsCardContainer}>
                {blogData && blogData.map((element, index)=>{
                    return <BlogCard key={index} element={element}/>
                })}
            </section>
            <button className={Styles.viewMoreButton}>View More</button>
        </main>
    </article>
    :
    isBlogPending ?
    <p>loading...</p>
    :
    blogError ? 
    <p>error...</p>
    :
    <p>this should not show...</p>
  }
    </>
  );
}
