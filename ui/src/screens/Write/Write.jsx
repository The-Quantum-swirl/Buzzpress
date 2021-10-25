import NavBar from "../../components/NavBar";
import { useState } from "react";
import { Result, Button } from "antd";
import Create from "./Create";
import Preview from "./Preview";
import { backendUrl, profileUrl } from "../common/Path";
import axios from "axios";

export default function Write() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    readTime: "5 min",
    authorLink: profileUrl+1,
    title: "",
    summary: "",
  });
  
  var previewData={};
  const handleNext = () => {
    // publish stage step 1 clicked on next
    if (currentStep === 1){
      // publish data
      console.log("publish data");
      console.log(data);

      axios.post(backendUrl+'/saveArticle/'+2,{
        articleId:4,
        authorId:2,
        heading:data.title,
        subHeading:data.summary,
        publishDate: data.publishDate,
        readTime: data.readTime,
        description: data.content.join("\n"),
        textType: data.contentType.join("\n"),
        tag:data.tag.join("\n"),
      }).then((res) => console.log(res));

      let formData = new FormData();
      formData.append("file", data.imagelist[0])
      axios.post(backendUrl+'/upload-image', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then((res) => console.log(res));
    }

    setCurrentStep( Math.min(currentStep + 1, 2) );
    setData(previewData);
  };

  const handlePrevious = () => {

    setCurrentStep( Math.max(currentStep - 1, 0) );
    setData(previewData);
  };
  const handleData = (temp) =>{
    // console.log(temp);
    previewData = temp;
    // console.log("<---- data ---->")
    // console.log(previewData);
  }
  const screen = [
    <Create data={(e) => handleData(e)} />,
    <Preview data={data} />,
    <Result
      status="success"
      title="Article Successfully Published!"
      subTitle="Server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Share with your friends
        </Button>,
      ]}
    />
  ];

  return (
    <>
      <NavBar />

      {screen[currentStep]}

      {/* Navigation start */}
      <div style={{ width: "100%", padding: "5%" }}>
        <Button shape="round" size="large" onClick={handlePrevious}>
          Back
        </Button>
        <Button shape="round" size="large" style={{ float: "right" }} onClick={handleNext}>
          Next
        </Button>
      </div>
      {/* Navigation ends */}
    </>
  );
}
