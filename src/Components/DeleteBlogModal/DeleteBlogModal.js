import { Box, Modal, Typography , Button} from '@mui/material'
import React from 'react'

export default function DeleteBlogModal({setOpenDelete, openDelete, deleteBlog, selectedRowData}) {

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
            Are you sure you want to delete <span style={{fontWeight: "bold", textDecoration:"underline"}}>{selectedRowData.title_en}</span>?
          </Typography>
          {/* <button onClick={()=>deleteBlog(selectedRowData._id)}>yesss</button>
          <button onClick={()=>setOpenDelete(false)}>noooo</button> */}
          <Button variant="contained" onClick={()=>deleteBlog(selectedRowData._id)}>Confirm</Button>
          <Button variant="contained" onClick={()=>setOpenDelete(false)}>Cancel</Button>

        </Box>
      </Modal>
  )
}
