import Styles from './BlogDetails.module.css'
import defaultLand from '../../Assets/blogHero.jpeg'
import defaultPort from '../../Assets/blogsHeroPort.jpg'
import { useEffect, useRef, useState } from 'react';
import YoutubeVideo from '../../Components/YouTube/youtube.js';
import BlogMD from '../../Components/BlogMD/BlogMD';
import CommentSection from '../../Components/CommentSection/CommentSection';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import dateConverter from '../../Utils/DateConverter';
import parse from 'html-react-parser'


export default function BlogDetails() {
  const [blogId, setBlogId] = useState("");
  const {slug} = useParams()
  console.log("slug: ", slug)

  const { isPending, error, data } = useQuery({
    queryKey: ["blogdetails"],
    queryFn: async () => {
      try {
        console.log("entering queryfn")
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog/one`, { slug });
        console.log("fetched blog res.data: ",res.data);
        setBlogId(res.data._id);
        return res.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
        throw error; // Re-throw the error to let React Query handle it
      }
    },
  });
  return (
    <>
    { data  ?
    <main className={Styles.blogOneMain}>
      {console.log("dataaaa: ", data)}
      <section className={Styles.blogOneTitleContainer}>
        <span className={Styles.selectedBlogOneSpiceName}>Lalezar</span>
        <h1 className={Styles.blogOneTitle}>{  data.title_en || "loading..."}</h1>
        <p className={Styles.selectedBlogOneDate}>{data ? dateConverter(data.updatedAt) : "loading..."}</p>
      </section>
      <picture className={Styles.blogOnePicture}>
        <source srcSet={data && typeof(data.images) === Array ? data.images[0] : ""} media="(orientation: landscape)" />
        <img src={defaultLand} alt="stock spices image" />
      </picture>
      <article className={Styles.articleValue}>
      {typeof data.description_en === 'string' ? parse(data.description_en) : ""}
      </article>
      {data && data.video ? (
        <YoutubeVideo videoUrl={data ? data.video : null}/>
      ):(
        ""
      )}
      {console.log("SENDING this: ", data.comments)}
      
      <CommentSection comments={data.comments} blogId={blogId}/>
      {/* {data && data.comments ?
      :
      <>    {console.log("i did not it inside data.comments: ", data.comments)}{console.log("i did not it inside data: ", data)}</>
      } */}
    </main>
     :
     isPending ? <p>loading...</p>
     :
     error ?
     <>
     {console.log("error!!! : ",error)}
     <p>error!</p>
     </>
     :
     <p>this is weird...</p>
     }
     </>
  )
}




