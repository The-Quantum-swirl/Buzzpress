import NavBar from "../../components/NavBar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Result, Button } from "antd";
import Create from "./Create";
import Preview from "./Preview";
import { backendUrl, profileUrl } from "../common/Path";
import axios from "axios";
import { convertDate } from "../common/Miscellaneous";

export default function Write() {
  const [currentStep, setCurrentStep] = useState(0);
  let history = useHistory(); 
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
      const today = new Date()
      axios.post(backendUrl+'/saveArticle/'+2,{
        articleId:4,
        authorId:2,
        title:data.title,
        summary:data.summary,
        publishDate: convertDate(today),
        readTime: data.readTime,
        description: data.content.join("\n"),
        textType: data.contentType.join("\n"),
        imageLink: data.firstImage,
        tag:data.tag.join("\n"),
      }).then((res) => console.log(res));

      // uploading image in batch start
      let imgArr = data.imagelist;
      let formData = new FormData();
      imgArr.forEach(element => {
        
        formData.append("file", element)
        axios.post(backendUrl+'/upload-image', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then((res) => console.log(res));
        formData.delete("file")
      });
      // uploading of image end
    }
    setCurrentStep( Math.min(currentStep + 1, 2) );
    setData(previewData);
  };

  const handlePrevious = () => {
    setCurrentStep( Math.max(currentStep - 1, 0) );
    setData(previewData);
  };
  const handleData = (temp) =>{
    previewData = temp;
  }
  const screen = [
    <Create data={handleData} />,
    <Preview data={data} />,
    <Result
      status="success"
      title="Article Successfully Published!"
      subTitle="Server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console" onClick={(e) => history.push("/home")}>
          Back to Home
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
