import React, { useState, useRef, useEffect } from 'react'
import Styles from './CommentSection.module.css'
import Comment from '../Comment/Comment';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function CommentSection({comments}) {
    console.log("comments received in commentsection: ", comments)
    const [comment, setComment] = useState("");
    const [commentParent, setCommentParent] = useState("");
    // const [allComments, setAllComments] = useState([{type:"comment"},2,3,{type:"comment"}]);
    // const [allComments, setAllComments] = useState([{type:"comment"},{type:"comment", replies:[{type:"reply", replies:[{type:"reply", replies:[{type:"reply"}]}]},{type:"reply"},{type:"reply"}]}]);
    const [allComments, setAllComments] = useState([{type: "comment",name:"Yahya Nashar", replies:[{type:"reply", name: "Fuad Abou Heit", replies:[{type: "reply", name:"Yahya Nashar"}]}]},{type: "comment", name:"nobody"},{type: "comment", name:"dark blue"}]);
    // const [allComments, setAllComments] = useState([]);
    console.log("RECEIVING this: ", comments)
    const [replyState, setReplyState] = useState("");

    const textAreaRef = useRef();


    const { isPending, error, data } = useQuery({
        queryKey: ["commentData"],
        queryFn: async () => {
          try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}comment/getMany`, { array: comments });
            // console.log("comments sent: ", comments)
            // console.log("fetched comments: ", res.data);
            setAllComments(res.data)
            return res.data;
          } catch (error) {
            console.error("Error fetching comments:", error);
            throw error; // Re-throw the error to let React Query handle it
          }
        },
      });



    // useEffect(()=>{
    //     setAllComments(comments);
    // },[])

    const focusOnTextArea = () => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      };

    const commentSubmitHandler = (event)=>{
        if(event) event.preventDefault();
        // console.log(textAreaValue);
        setComment("");
        setReplyState("");
        textAreaRef.current.blur();
        if(!replyState){
            // console.log("")
            const addedComment = {
                type: "comment",
                name: "my username",

            }
            setAllComments((prev)=>[...prev, addedComment]);
        } else {
            //handle comment reply
            //find parent by commentparent (parent id)
            //finally add reply child to replies.
        }
    }

    const handleKeyDown = (event)=>{
        if(event.key === "Enter"){
            event.preventDefault();
            commentSubmitHandler();
        }
    }

  return (
    <>
    <p className={Styles.commentsHeader}>Comments</p>
    { data ? 
        <>
        <span className={Styles.replyCancel}>{replyState}</span>
        <article className={Styles.commentsMainContainer}>
            <form 
            className={Styles.addComment}
            onSubmit={commentSubmitHandler}
            >
                <textarea 
                ref={textAreaRef}
                type='text' 
                className={Styles.commentInput}
                onChange={(e)=>setComment(e.target.value)}
                placeholder='Leave a comment'
                rows='10'
                onKeyDown={handleKeyDown}
                value={comment}
                onBlur={()=>setReplyState()}
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
            {/* { allComments.length > 0 ? */}
                <div className={Styles.allComments}>
                    { allComments ? (
                    allComments.map((element, index)=>{
                        // console.log("element: ", element)
                        return <Comment key={index} element={element} parentName={element.name} focusOnTextArea={focusOnTextArea} setReplyState={setReplyState}/>
                    }) 
                    ): (
                      <p className={Styles.noComments}>No comments yet</p>
                    )}      
                </div>
                
             
            {/* </form> */}
            {/* </form> */}
          </article>
        </>
        :
        isPending ? 
        <p>loading...</p>
        :
        error ?
        <p>error!</p>
        :
        <p>this should never appear</p>
        }
    </>
  )
}
