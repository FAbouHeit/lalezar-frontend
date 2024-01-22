import Styles from './BlogDetails.module.css'
// import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './land.avif';
import img5 from './port.jpeg';
import { useEffect, useRef, useState } from 'react';
import YoutubeVideo from './youtube.js';
import BlogMD from '../../Components/BlogMD/BlogMD';
import CommentSection from '../../Components/CommentSection/CommentSection';


export default function BlogDetails() {
  const [selectedWidth, setSelectedWidth] = useState(0);
  const blogArticle = useRef();

  useEffect(()=>{
    function updateSize() {
      if(window.innerWidth > 900){
        // setSelectedWidth
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
    }
  },[])

  return (
    <main className={Styles.blogOneMain}>
      <section className={Styles.blogOneTitleContainer}>
        <span className={Styles.selectedBlogOneSpiceName}>Spice</span>
        <h1 className={Styles.blogOneTitle}>This is my new title! check out how long I can be :/</h1>
        <p className={Styles.selectedBlogOneDate}>15.2.3300</p>
      </section>

      <picture className={Styles.blogOnePicture}>
                        {/* <source srcSet={img1} media="(max-width: 500px)" />
                        <source srcSet={img2} media="(max-width:1000px)" /> */}
                        <source srcSet={img5} media="(orientation: portrait)" />
                        <source srcSet={img4} media="(orientation: landscape)" />

                        <img src={img3} alt="Descriptive Alt Text" />
      </picture>

      <BlogMD text={""} />

      <section  className={Styles.youtubeVideo}>
        {/* <YoutubeVideo videoUrl={"https://www.youtube.com/watch?v=magXOsH5QAc"}/> */}
        <YoutubeVideo videoUrl={"https://www.youtube.com/watch?v=magXAc"}/>
      </section>

      <CommentSection/>


    </main>
  )
}




