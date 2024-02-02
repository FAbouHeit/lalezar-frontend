import { Box, Modal, TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextEditor from '../TextEditor/TextEditor';

export default function CreateBlogModal({setOpenCreate, openCreate, newBlog, setNewBlog, createBlog}) {

    const [textAr, setTextAr] = useState("");
    const [textEn, setTextEn] = useState("");

    useEffect(()=>{
      setNewBlog({...newBlog, description_en: textEn});
    },[textEn])
    
    useEffect(()=>{
      setNewBlog({...newBlog, description_ar: textAr});
    },[textAr])

    const changeTitleEn = (e) =>{
        setNewBlog({...newBlog, title_en: e.target.value});
    }
    const changeTitleAr = (e) =>{
        setNewBlog({...newBlog, title_ar: e.target.value});
    }
    const changeYoutubeLink = (e) =>{
        setNewBlog({...newBlog, video: e.target.value});
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:"flex",
        flexDirection:"column",
        gap:"20px",
        maxHeight:"90%",
        overflowY: "scroll"
      };

  return (
    <>    
    <Modal
    open={openCreate || false}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <button onClick={()=>console.log(newBlog)}>print</button>
        <div style={{display: "flex", gap:"20px"}}>
        <TextField
          id="outlined-basic" 
          placeholder="Title English" 
          label="Blog title English" 
          variant="outlined" 
          fullWidth 
          required={true} 
          value={ newBlog.title_en} 
          focused={newBlog.title_en ? true : false} 
          onChange={(e)=>changeTitleEn(e)}
          />
          <TextField 
          id="outlined-basic" 
          placeholder="Title Arabic" 
          label= "Blog title Arabic"
          variant="outlined" 
          fullWidth 
          required={true} 
          value={newBlog.title_ar} 
          focused={newBlog.title_ar ? true : false} 
          onChange={(e)=>changeTitleAr(e)}
          />
          </div>
          <TextEditor lang={"en"} setText={setTextEn}/>
          <TextEditor lang={"ar"} setText={setTextAr}/>
          <TextField 
          id="outlined-basic" 
          placeholder="Youtube Link" 
          label= "Youtube Link"
          variant="outlined" 
          fullWidth 
          value={newBlog.video} 
          focused={newBlog.video ? true : false} 
          onChange={(e)=>changeYoutubeLink(e)}
          />
          <div style={{display:"flex", gap:"20px"}}>
            {/* <button onClick={()=>createBlog()}>create</button>
            <button onClick={()=>setOpenCreate(false)}>cancel</button> */}
            <Button variant="contained" onClick={()=>createBlog()}>Create</Button>
            <Button variant="contained" onClick={()=>setOpenCreate(false)}>Cancel</Button>

          </div>
    </Box>
  </Modal>
  </>
  )
}

