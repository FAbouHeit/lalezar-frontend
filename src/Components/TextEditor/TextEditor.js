import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './TextEditor.module.css'

export default function TextEditor ({lang="en", setText, description, changeDescription}) {
  const [value, setValue] = useState(description || "");

  const handleChange = (html) =>{
    setValue(html);
    if(setText){
      setText(html)
    }
    if(changeDescription){
      changeDescription(html)
    }
  }

  // useEffect(()=>{
  //   if(description){
  //     // setValue(parse(description).props.children)
  //     // console.log("description: ", description)
  //     // console.log("parsed description: ", parse(description))
  //     // console.log("value: ", value)

  //     setValue(description);
  //   }
  // },[])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link'
  ];



  return (

    <ReactQuill
      className={Styles.textField}
      theme="snow"
      value={ value }
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

