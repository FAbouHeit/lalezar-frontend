import React, { useEffect, useState, useRef } from 'react'
import Styles from './Comment.module.css'
import image1 from '../../Pages/BlogDetails/1.avif'
import { useInView, motion } from 'framer-motion'

export default function Comment({element, parentName}) {
    // const [replies, setReplies] = useState([{type:"reply"},{type:"reply"},{type:"reply"}]);
    const [replies, setReplies] = useState([]);
    const [openReplies, setOpenReplies] = useState(false);
    const type = element.type;
    // const commentRef = useRef();
    // const isInView = useInView(commentRef);

    const handleReplyButton = () =>{
        setOpenReplies(!openReplies);

    }

    useEffect(()=>{
        console.log(element)
        setReplies(element.replies);
    },[element])

  return (
    <>
    <motion.section 
    // ref={commentRef}
    initial={{ opacity: 0, y:100 }}
    animate={{ opacity: 1, y:0 }}
    transition={{duration:0.3}}
    className={`${Styles.commentComponentContainer} ${type === "comment" ? Styles.typeComment : Styles.typeReply }`}>
        <img src={image1} height={50} width={50} style={{borderRadius: "50%"}}/>
        <div className={Styles.commentComponentInfo}>
            <p className={Styles.commentUser}>{element.name} {type === "reply" ? <span>--Replying to {parentName}</span> : ""}</p>
            <span className={Styles.commentDate}>time: today</span>
            <p className={Styles.commentDescription}>this is a {type}</p>
            <div className={`${Styles.commentBottomPart} ${replies ? Styles.yesReplies : ""}`}>
                <span className={Styles.commentViewReplies} onClick={handleReplyButton}>{replies ? openReplies ? "hide replies" : "view replies" : ""}</span>
                <span className={Styles.commentReply}>reply</span>
            </div>
        </div>        
    </motion.section>

    <div className={Styles.allReplies}>
    {replies ? openReplies ? replies.map((ele, index)=>{
        return <Comment key={index} element={ele} parentName ={element.name}></Comment>
    }) : "" : ""}
    </div>
    </>

  )
}
