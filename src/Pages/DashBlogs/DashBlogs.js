import Styles from './DashBlogs.module.css'
import Table from '../../Components/Table/Table'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditBlogModal from '../../Components/EditBlogModal/EditBlogModal';
import DeleteBlogModal from '../../Components/DeleteBlogModal/DeleteBlogModal';
import CreateBlogModal from '../../Components/CreateBlogModal/CreateBlogModal';
import Button from '@mui/material/Button';

const DashBlogs = () => {

  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);
  const [tempBlog, setTempBlog] = useState({
    title_en: selectedRowData.title_en || '',
    title_ar: selectedRowData.title_ar || '',
    description_en: selectedRowData.description_en || '',
    description_ar: selectedRowData.description_ar || '',
    video: selectedRowData.video || '',
  })
  const [newBlog, setNewBlog] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    video: '',
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

  const createBlog = async () => {
    console.log("newBlog: ", newBlog);

    try{
    console.log("createBlog function triggered!")
    if(newBlog){
        console.log("newblog has passed the if statement and will be created")
        await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog`, {
          title_en: newBlog.title_en,
          title_ar: newBlog.title_ar,
          description_en: newBlog.description_en,
          description_ar: newBlog.description_ar,
          video: newBlog.video,
        });
    }
    setOpenCreate(false);
    blogsRefetch();
    return;

    } catch (error){
      setOpenCreate(false);
      console.log("error: ", error);
      return;
    }
  }


  const deleteBlog = async (id) => {
    console.log("selectedrowdata ID: ", id);

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
    console.log("tempBlog id: ", id);

    try {
        await axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}blog/${id}`, {tempBlog});
        setOpenEdit(false);
        blogsRefetch();
        return;
    } catch (error) {
        setOpenEdit(false);
        console.error("Error updating:", error);
      return;
    }
  };


  useEffect(()=>{
      // console.log("selectedrowdata: ", selectedRowData);
      setTempBlog(selectedRowData);
  },[selectedRowData])

  useEffect(()=>{
    // if(openCreate){
    //   console.log("selectedrowdata: ", selectedRowData);
    // }
    setNewBlog({});
  },[openCreate])

  useEffect(()=>{
    if(openEdit){
      console.log("selectedrowdata: ", selectedRowData);
    }


    if(!openEdit){
       setTempBlog({
          title_en:  '',
          title_ar:  '',
          description_en: '',
          description_ar: '',
          video: '',
      })
    } else {
      setTempBlog({
        title_en: selectedRowData.title_en,
        title_ar: selectedRowData.title_ar,
        description_en: selectedRowData.description_en,
        description_ar: selectedRowData.description_ar,
        video: selectedRowData.video,
      })
    }
  },[openEdit])




  return (
    <>
    { allBlogs ? 
    <main className={Styles.container}>
        <Button variant="contained" onClick={()=>setOpenCreate(true)}>Create A Blog</Button>
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
      
      <DeleteBlogModal 
      setOpenDelete={setOpenDelete}
      openDelete= {openDelete}
      deleteBlog={deleteBlog}
      selectedRowData={selectedRowData}
      />


      <EditBlogModal
      setOpenEdit={setOpenEdit}
      openEdit={openEdit}
      tempBlog={tempBlog}
      setTempBlog={setTempBlog}
      updateBlog={updateBlog}
      selectedRowData={selectedRowData}
      />


      <CreateBlogModal
      setOpenCreate={setOpenCreate} 
      openCreate = {openCreate}
      newBlog = {newBlog}
      setNewBlog = {setNewBlog}
      createBlog = {createBlog}
      />
      
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
