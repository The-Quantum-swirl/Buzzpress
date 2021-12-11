import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Create from "./Create";
import Preview from "./Preview";
import { convertDate } from "../../components/Date";
import api from "../../service/ServiceCall";
import { Response } from "../../service/Response";
import ReactGA from 'react-ga';


ReactGA.initialize('UA-214937125-1');
export default function Write() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({ readTime: "1 min", authorLink: api.getProfileUrl('you'), title: "", summary: "",});
  var statusCode = 200, previewData = {};

  useEffect(()=>{
    
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  const outcome = (res1, res2) => {
    if (res1 !== 200) statusCode = res1;
    else if (res2 !== 200) statusCode = res2;
    else statusCode = 200;
  };

  const publishPayload = () =>{
    
    console.log("publishing data.....");
    let rawDataResponse=404, imgDataResponse=404;

    // making raw data payload for posting
    var payload = {
      title: data.title,
      summary: data.summary,
      publishDate: convertDate(new Date()),
      readTime: data.readTime,
      description: data.content.join("\n"),
      textType: data.contentType.join("\n"),
      imageLink: data.firstImage,
      tag: data.tag.join("\n"),
    };
    // getting raw data response status in code 200,404,500 etc
    rawDataResponse = api.postArticle(payload);

    // uploading image in batch start
    let imgArr = data.imagelist;
    let formData = new FormData();

    // looping for individual image upload
    imgArr.forEach((element) => {
      // formdata append and delete
      formData.append("file", element);
      imgDataResponse = api.postImage(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      formData.delete("file");
    });
    // uploading of image end

    outcome(imgDataResponse, rawDataResponse);
  }

  // Will handle counter for front movement
  const handleNext = () => {
    // publish stage step 1 clicked on next
    if (currentStep === 1) {
      // publish data
      publishPayload();
    }
    setCurrentStep(Math.min(currentStep + 1, 2));
    setData(previewData);
  };
  // will handle the counter back movement
  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    setData(previewData);
  };

  // will update date from child components for preview
  const handleData = (temp) => {
    previewData = temp;
  };

  // screen allotment on the basis of screen index counter currentStep
  const screen = [
    <Create data={handleData} />,
    <Preview data={data} />,
    <Response statusCode={statusCode} />,
  ];
  // adaptive back button
  const backStep = (index) => {
    let disable = false;
    let buttonName = "Back";

    if (index === 0) disable = true;
    else if (index === 1) buttonName = "Create";
    else disable = true;

    return (
      <Button
        type="default"
        shape="round"
        size="large"
        onClick={handlePrevious}
        disabled={disable}
      >
        {buttonName}
      </Button>
    );
  };
  // addaptive front button
  const frontStep = (index) => {
    let disable = false;
    let buttonName = "Next";

    if (index === 0) buttonName = "Preview";
    else if (index === 1) buttonName = "Publish";
    else disable = true;

    return (
      <Button
        type="primary"
        shape="round"
        size="large"
        style={{ float: "right" }}
        onClick={handleNext}
        disabled={disable}
      >
        {buttonName}
      </Button>
    );
  };

  return (
    <>
      <NavBar />
      {/* Screen Scenario Create --> Preview --> ResponsePage */}
      {screen[currentStep]}

      {/* Navigation start */}
      <div style={{ width: "100%", padding: "5%" }}>
        {backStep(currentStep)}
        {frontStep(currentStep)}
      </div>
      {/* Navigation ends */}
    </>
  );
}
