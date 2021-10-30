import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

export default function UploadButton({ imageData }) {
  const [fileList, setFileList] = useState([]);

  function onChange({ fileList: newFileList }) {
    setFileList(newFileList);
    console.log(newFileList[0]);
    imageData(newFileList[0]);
  };
  function handleImageUpload(event) {
    setFileList(event.target.files[0]);
    imageData(event.target.files[0]);
  }
  return (
    <>
      {/* <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span" startIcon={<UploadIcon />}>
          Upload
        </Button>
      </label>  */}
      <input type="file" onChange={handleImageUpload} />
    </>
  );
};