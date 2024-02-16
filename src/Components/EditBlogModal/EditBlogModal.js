import { Box, Modal, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";

export default function EditBlogModal({
  setOpenEdit,
  openEdit,
  selectedRowData,
  tempBlog,
  setTempBlog,
  updateBlog,
}) {
  const changeTitleEn = (e) => {
    setTempBlog({ ...tempBlog, title_en: e.target.value });
  };
  const changeTitleAr = (e) => {
    setTempBlog({ ...tempBlog, title_ar: e.target.value });
  };
  const changeTextEn = (text) => {
    setTempBlog({ ...tempBlog, description_en: text });
  };
  const changeTextAr = (text) => {
    setTempBlog({ ...tempBlog, description_ar: text });
  };
  const changeYoutubeLink = (e) => {
    setTempBlog({ ...tempBlog, video: e.target.value });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxHeight: "90%",
    overflowY: "scroll",
  };

  return (
    <>
      <Modal
        open={openEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              id="outlined-basic"
              placeholder="Title English"
              label="Blog title English"
              variant="outlined"
              fullWidth
              required={true}
              value={tempBlog.title_en}
              focused={tempBlog.title_en ? true : false}
              onChange={(e) => changeTitleEn(e)}
            />
            <TextField
              id="outlined-basic"
              placeholder="Title Arabic"
              label="Blog title Arabic"
              variant="outlined"
              fullWidth
              required={true}
              value={tempBlog.title_ar}
              focused={tempBlog.title_ar ? true : false}
              onChange={(e) => changeTitleAr(e)}
            />
          </div>
          <TextEditor
            lang={"en"}
            description={selectedRowData.description_en}
            changeDescription={changeTextEn}
          />
          <TextEditor
            lang={"ar"}
            description={selectedRowData.description_ar}
            changeDescription={changeTextAr}
          />
          <TextField
            id="outlined-basic"
            placeholder="Youtube Link"
            label="Youtube Link"
            variant="outlined"
            fullWidth
            value={tempBlog.video}
            focused={tempBlog.video ? true : false}
            onChange={(e) => changeYoutubeLink(e)}
          />
          <div style={{ display: "flex", gap: "20px" }}>
            {/* <button onClick={()=>updateBlog()}>create</button>
                <button onClick={()=>setOpenEdit(false)}>cancel</button> */}
            <Button
              variant="contained"
              onClick={() => updateBlog(selectedRowData._id)}
              sx={{
                bgcolor: "#C86823",
                transition: "background-color 0.3s ease, color 0.3s ease",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#A0471D",
                  color: "white",
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenEdit(false)}
              sx={{
                color: "#C86823",
                borderColor: "#C86823",
                transition: "background-color 0.3s ease, color 0.3s ease",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#C86823",
                  backgroundColor: "#C86823",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
