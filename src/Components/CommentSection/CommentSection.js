import React, { useState } from 'react'
import Styles from './CommentSection.module.css'
import Comment from '../Comment/Comment';

export default function CommentSection() {
    const [comment, setComment] = useState("");
    // const [allComments, setAllComments] = useState([{type:"comment"},2,3,{type:"comment"}]);
    // const [allComments, setAllComments] = useState([{type:"comment"},{type:"comment", replies:[{type:"reply", replies:[{type:"reply", replies:[{type:"reply"}]}]},{type:"reply"},{type:"reply"}]}]);
    const [allComments, setAllComments] = useState([{type: "comment",name:"Yahya Nashar", replies:[{type:"reply", name: "Fuad Abou Heit", replies:[{type: "reply", name:"Yahya Nashar"}]}]},{type: "comment", name:"nobody"},{type: "comment", name:"dark blue"}]);

    const commentSubmitHandler = (event)=>{
        if(event) event.preventDefault();
        console.log(comment);
        setComment("");
    }

    const handleKeyDown = (event)=>{
        if(event.key === "Enter"){
            event.preventDefault();
            commentSubmitHandler();
        }
    }

  return (
    <article className={Styles.commentsMainContainer}>
        <form 
        className={Styles.addComment}
        onSubmit={commentSubmitHandler}
        >
            <textarea 
            type='text' 
            className={Styles.commentInput}
            onChange={(e)=>setComment(e.target.value)}
            placeholder='Leave a comment'
            rows='3'
            onKeyDown={handleKeyDown}
            value={comment}
            />
            <div className={Styles.commentButtonContainer}>
                <button 
                className={Styles.buttonReset}
                type='reset'
                onClick={(e)=>setComment("")}
                disabled={comment ? false : true}
                >Cancel
                </button>
                <button 
                className={Styles.buttonSubmit}
                type='submit'
                >Post</button>
            </div>
        </form>

        <div className={Styles.allComments}>
            {allComments.map((element, index)=>{
                return <Comment key={index} element={element} parentName={element.name}></Comment>
            })}
        </div>


    </article>
  )
}
