import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

export default function UploadButton({ imageData }) {
  const [fileList, setFileList] = useState([ ]);

  function onChange ({ fileList: newFileList }) {
    setFileList(newFileList);
    // console.log(newFileList);
    imageData(newFileList[0]);
  };
  return (
    <>
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
    </>
  );
};