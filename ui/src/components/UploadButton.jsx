import React, { useState } from 'react';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

export default function UploadButton({ imageData }) {
  const [fileList, setFileList] = useState([]);

  function onChange({ fileList: newFileList }) {
    setFileList(newFileList);
    // console.log(newFileList);
    console.log(newFileList[0]);
    imageData(newFileList[0]);
  };
  function handleImageUpload(event) {
    console.log(event);
    setFileList(event.target.files[0]);

    imageData(event.target.files[0]);
    // const imgfile=event.target.files[0]; 
    // console.log(imgfile);
    // console.log(URL.createObjectURL(imgfile))
  }
  return (
    <>
      {/* <ImgCrop rotate> */}
      {/* <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload> */}
      {/* </ImgCrop> */}
      <input type="file" onChange={handleImageUpload} />
    </>
  );
};