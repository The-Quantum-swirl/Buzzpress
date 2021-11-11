import NavBar from "../../components/NavBar";
import { useState } from "react";
import { Button } from "antd";
import Create from "./Create";
import Preview from "./Preview";
import { backendUrl, profileUrl } from "../../components/common/Path";
import { convertDate } from "../../components/common/Miscellaneous";
import api from "../../service/ServiceCall";
import { Response } from "../../service/Response";

export default function Write() {
  const [currentStep, setCurrentStep] = useState(0);
  const authorId =3;
  var statusCode = 200;
  const [data, setData] = useState({
    readTime: "5 min",
    authorLink: profileUrl,
    title: "",
    summary: "",
  });

  const outcome = (res1, res2) => {
    if(res1 !==200 ) statusCode = res1;
    else if(res2 !==200 ) statusCode = res2;
    else statusCode= 200;
  }

  var previewData={};
  const handleNext = () => {
    // publish stage step 1 clicked on next
    if (currentStep === 1){
      // publish data
      console.log("publish data");
      
      var payload={
        authorId:authorId,
        title:data.title,
        summary:data.summary,
        publishDate: convertDate(new Date()),
        readTime: data.readTime,
        description: data.content.join("\n"),
        textType: data.contentType.join("\n"),
        imageLink: data.firstImage,
        tag:data.tag.join("\n"),
      }

      let rawDataResponse = api.postArticle(authorId, payload) || "";

      // axios.post(backendUrl+'/saveArticle/'+authorId,{
      //   authorId:authorId,
      //   title:data.title,
      //   summary:data.summary,
      //   publishDate: convertDate(today),
      //   readTime: data.readTime,
      //   description: data.content.join("\n"),
      //   textType: data.contentType.join("\n"),
      //   imageLink: data.firstImage,
      //   tag:data.tag.join("\n"),
      // }).then((res) => console.log(res));

      // uploading image in batch start
      let imgArr = data.imagelist;
      let formData = new FormData();
      let imgDataResponse ="";
      imgArr.forEach(element => {
        
        formData.append("file", element)
        imgDataResponse=api.postImage(formData, { headers: {"Content-Type": "multipart/form-data",}})

        // axios.post(backendUrl+'/upload-image', formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   }
        // }).then((res) => console.log(res));
        formData.delete("file")
      });
      // uploading of image end

      outcome(imgDataResponse, rawDataResponse);
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
    <Response statusCode={statusCode} />,
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
