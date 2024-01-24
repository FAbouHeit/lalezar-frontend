import React, { useEffect, useState, useRef } from 'react'
import Styles from './Comment.module.css'
import image1 from '../../Pages/BlogDetails/1.avif'
import { motion } from 'framer-motion'
import dateConverter from '../../Utils/DateConverter.js'

export default function Comment({element, parentName, focusOnTextArea, setReplyState}) {
    // const [replies, setReplies] = useState([{type:"reply"},{type:"reply"},{type:"reply"}]);
    const [replies, setReplies] = useState([]);
    const [openReplies, setOpenReplies] = useState(false);
    const [commentDate, setCommentDate] = useState("");
    const type = element.type;
    // const commentRef = useRef();
    // const isInView = useInView(commentRef);

    const handleViewReplyButton = () =>{
        setOpenReplies(!openReplies);
    }

    const handleReplyButton = () =>{
        // console.log("reply to: ", parentName);
        focusOnTextArea();
        setReplyState(`replying to ${element.name}`);
    }

    useEffect(()=>{
        // console.log(element)
        setReplies(element.replies);
        const date = dateConverter(element.createdAt);
        setCommentDate(date);
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
            <p className={Styles.commentUser}>{element.name || "not loaded"} {type === "reply" ? <><span style={{color:"#777"}}>-- Replied to {parentName}</span> <span style={{color:"blue"}}>&#8617;</span></> : ""}</p>
            <span className={Styles.commentDate}>{commentDate}</span>
            <p className={Styles.commentDescription}>{element.description || ""}</p>
            <div className={`${Styles.commentBottomPart} ${replies ? Styles.yesReplies : ""}`}>
                <span className={Styles.commentViewReplies} style={replies.length>0 ? "" : {display:"none"} } onClick={handleViewReplyButton}>{replies.length > 0 ? openReplies ? "hide replies" : "view replies" : ""}</span>
                <span className={Styles.commentReply} onClick={handleReplyButton}>reply</span>
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
