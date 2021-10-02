import NavBar from "../components/NavBar";
import { useState } from "react";
import ScreenSize from "../components/ScreenSize";
import { Steps, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Divider, Radio } from 'antd';
import { TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MinusOutlined, PlusOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import UploadButton from "../components/UploadButton";

export default function Create() {
  const [inputType, setInputType] = useState(["para"]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  let [para, setPara] = useState([""]);

  const handleChange = (event, position) => {
    let updatedPara = [...para];
    updatedPara[position] = event.target.value;
    setPara(updatedPara)
  }

  const addField = (event, pos) => {
    let oldPara = [...para];
    oldPara.splice(pos + 1, 0, "");
    setPara(oldPara);
    typee.push("Paragraph");
    console.log(typee);
    console.log("Screeen size "+ScreenSize)
  }
  const deleteField = (event, pos) => {
    if (para.length === 1) return;

    let oldPara = [...para];
    oldPara.splice(pos, 1);
    setPara(oldPara);
    let oldTypee = [...typee];
    oldTypee.splice(pos, 1)
    settypee(oldTypee)
    console.log(typee);
  }

  let [typee, settypee] = useState(["para"])
  function handleSelectChange(e, index) {
    console.log(e);
    let inparr = [...inputType];
    inparr[index] = e.target.value;
    setInputType(inparr);

    console.log(typee);
    let newtype = [...typee];
    newtype[index] = e.target.value;
    settypee(newtype);
    console.log("type change called");
  }
  const handleNext = () => {
    if (currentStep+1 < 3){
      setCurrentStep(currentStep+1);
    }
    // else publish
  }

  const handlePrevious = () => {
    if (currentStep-1 > -1){
      setCurrentStep(currentStep-1);
    }
  }
  return (
    <>
      <NavBar />
      <Row style={{marginTop:'2%'}}>

        <Col offset={1} span={22} style={{maxWidth:'700px'}}>
        
          <TextField id="standard-textarea"
            placeholder="Title"
            multiline
            variant="standard"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{ width: '90%', 
            margin:'15px' 
            }}
            color="secondary"
          />

          <TextField id="standard-textarea"
            placeholder="Recap"
            multiline
            variant="standard"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{ width: '90%',
            margin: '15px' 
             }}
          />
          {heading}{subHeading}
          {/* {fieldComponent} */}
          {para.map((object, index) => {
            return (
              <div style={{ margin: '15px',}} >
                <Radio.Group defaultValue="heading" buttonStyle="solid" 
                size="middle"
                onChange={(e) => handleSelectChange(e, index)} >
                  <Radio.Button value="heading">Heading</Radio.Button>
                  <Radio.Button value="para">Para</Radio.Button>
                  <Radio.Button value="image">Image</Radio.Button>
                </Radio.Group>
                
                <Row style={{ marginTop:'20px'}}>
                <Col span={17}>
                {inputType[index] === "image"? 
                (
                <UploadButton />

                ):(
                <TextField
                  id="standard-textarea"
                  placeholder="Write here"
                  multiline
                  variant="standard"
                  value={para[index]}
                  onChange={(e) => handleChange(e, index)}
                  style={{ width: '100%', marginRight: '1%' }}
                />
                )}
                </Col>
                <Col offset={1} span={6}>

                <Button shape="circle" size="middle" style={{ marginRight: '1%' }}
                  onClick={(e) => addField(e, index)}><PlusOutlined /></Button>

                <Button shape="circle" size="middle"
                  onClick={(e) => deleteField(e, index)}><MinusOutlined /></Button>
                </Col>
                </Row>

              </div>
            );
          })}

          <div style={{width:"100%"}}>
          <Button shape="round" size="large" 
          // style={{padding:'0'}} 
          onClick={handlePrevious}
          // icon={<LeftCircleOutlined style={{fontSize:'39px', color: '#08c'}} />}
          >Back
          </Button>

          <Button shape="round" size="large" 
          style={{ float:'right'}} 
          onClick={handleNext}
          // icon={<RightCircleOutlined style={{fontSize:'39px', color: '#08c'}} />}
          >
            Next
          </Button>
          </div>

          {/* </Space> */}
        </Col>

        <div id="fadeshow">
          #preview here
        </div>
      </Row>
    </>
  );

}