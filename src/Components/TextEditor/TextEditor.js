import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './TextEditor.module.css'

export default function TextEditor ({lang="en"}) {
  const [value, setValue] = useState('');

  // const quillStyle = {
  //   direction: `${lang === 'ar' ? 'rtl' : 'ltr'}`, // 'rtl' for right-to-left, 'ltr' for left-to-right
  // };

  return (

    // <ReactQuill theme="snow" value={value} onChange={setValue} />
    <ReactQuill
    // style={quillStyle}
      // onChange={handleChange}
      className={Styles.textField}
      theme='snow'
      placeholder={`${lang=== "en" ? "Write your blog here..." : "اكتب المقال هنا..."}`}
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3 , 4 , 5 , 6 , false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
      ]}
    />
  );
};

