import Styles from './DashBlogs.module.css'
import Table from '../../Components/Table/Table'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Modal, TextField, Typography } from '@mui/material';

const DashBlogs = () => {

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);
  const [fetchState, setFetchState] = useState(false)
  const [editedBlog, setEditedBlog] = useState({
    title_en: selectedRowData.title_en || '',
    title_ar: selectedRowData.title_ar || '',
    description_en: selectedRowData.description_en || '',
    description_ar: selectedRowData.description_ar || '',
    video: selectedRowData.video || '',
  })
  
  const getData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog`);
        if (res.data.length > 0) {
          setAllBlogs(res.data);
        }
        return res.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
        throw error;
      }
  }

  let { isPending: isBlogPending, error: blogError, data: blogData, refetch: blogsRefetch } = useQuery({
    queryKey: ["blogDashboard"],
    queryFn: getData
  });


  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog/${id}`);
      setOpenDelete(false);
      blogsRefetch();
      return; 
    } catch (error) {
      setOpenDelete(false);
      console.error("Error deleting:", error);
      return;
    }
  };


  const updateBlog = async (id) => {
    try {
        await axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog/${id}`, {editedBlog});
        setOpenEdit(false);
        blogsRefetch();
        return;
    } catch (error) {
        setOpenEdit(false);
        console.error("Error updating:", error);
      return;
    }
  };

  const changeTitleEn = (e) =>{
    setEditedBlog({...editedBlog, title_en: e.target.value});
  }
  const changeTitleAr = (e) =>{
    setEditedBlog({...editedBlog, title_ar: e.target.value});
  }
  const changeTextEn = (e) =>{
    setEditedBlog({...editedBlog, description_en: e.target.value});
  }
  const changeTextAr = (e) =>{
    setEditedBlog({...editedBlog, description_ar: e.target.value});
  }
  const changeYoutubeLink = (e) =>{
    setEditedBlog({...editedBlog, video: e.target.value});
  }
  
  useEffect(()=>{
    console.log(selectedRowData);
    setEditedBlog(selectedRowData);
  },[selectedRowData])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    gap:"20px"
  };

  return (
    <>
    { allBlogs ? 
    <main className={Styles.container}>
      <section>
        <Table 
        data={allBlogs && allBlogs} //all blogs
        isEdit={true} //true
        ForWhat="blogs" //blogs
        handleEditOpen={() => setOpenEdit(true)} 
        setSelectedRowData={setSelectedRowData} 
        handleOpenDelete={() => setOpenDelete(true)} 
        />
      </section>
      <Modal
        open={openDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <button onClick={()=>deleteBlog(selectedRowData._id)}>yesss</button>
          <button onClick={()=>setOpenDelete(false)}>noooo</button>
        </Box>
      </Modal>


      <Modal
        open={openEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {selectedRowData.title_en}
          </Typography>

          <TextField 
          id="outlined-basic" 
          placeholder="Title English" 
          label={selectedRowData.title_en || "Blog title English"} 
          variant="outlined" 
          fullWidth 
          required={true} 
          value={ editedBlog.title_en} 
          focused={selectedRowData.title_en ? true : false} 
          onChange={(e)=>changeTitleEn(e)}
          />
          <TextField 
          id="outlined-basic" 
          placeholder="Title Arabic" 
          label={selectedRowData.title_ar || "Blog title Arabic"} 
          variant="outlined" 
          fullWidth 
          required={true} 
          value={editedBlog.title_ar} 
          focused={selectedRowData.title_ar ? true : false} 
          onChange={(e)=>changeTitleAr(e)}

          />
          <TextField 
          id="outlined-basic" 
          placeholder="Text English" 
          label={selectedRowData.desription_en || "Blog text English"} 
          variant="outlined" 
          fullWidth 
          required={true} 
          value={editedBlog.description_en} 
          focused={selectedRowData.description_en ? true : false} 
          onChange={(e)=>changeTextEn(e)}
          />
          <TextField 
          id="outlined-basic" 
          placeholder="Text English" 
          label={selectedRowData.description_ar || "Blog text Arabic"} 
          variant="outlined" 
          fullWidth 
          required={true} 
          value={editedBlog.description_ar} 
          focused={selectedRowData.description_ar ? true : false} 
          onChange={(e)=>changeTextAr(e)}
          />
          <TextField 
          id="outlined-basic" 
          placeholder="Youtube Link" 
          label={selectedRowData.video || "Youtube Link"} 
          variant="outlined" 
          fullWidth 
          required={false} 
          value={editedBlog.video} 
          focused={selectedRowData.video ? true : false} 
          onChange={(e)=>changeYoutubeLink(e)}
          />
          <button onClick={()=>updateBlog(selectedRowData._id)}>save</button>
          <button onClick={()=>setOpenEdit(false)}>cancel</button>
        </Box>
      </Modal>

      
    </main>
    
    :
    isBlogPending ?
    <p>loading...loadingloadingloadingloading</p>
    :
    blogError ?
    <p>error!error!error!error!error!</p>
    :
    <p>this shouldnt appear!</p>
    }
    {blogError && console.log(blogError)}
    </>
  )
}

export default DashBlogs