import NavBar from "../components/NavBar";
import { useState } from "react";
import ScreenSize from "../components/ScreenSize";
import { Steps, Row, Col } from 'antd';
import { Button, Input, Select, Space, Divider } from 'antd';
import { TextField, MenuItem } from '@mui/material';
import { MinusOutlined, PlusOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Step } = Steps;

export default function Create() {
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
  let [typee, settypee] = useState(["Paragraph"])
  function handleSelectChange(e, index) {
    console.log(e);
    // console.log(typee);
    let newtype = [...typee];
    newtype[index] = e;
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
      <Row>

        <Col offset={2} span={20}>
          {/* <Space direction="vertical"> */}

          <Steps 
            size="default" 
            type="navigation"
            current={currentStep} 
            style={{ marginTop: '3%' }}>

            <Step title="Create" description="What's on your mind" />
            <Step title="Preview" description="See what it will look" />
            <Step title="Share" description="Share on social media" />
          </Steps>

          {/* <Divider style={{ margin: '1% 0 5% 0', width: '100%', minWidth: '30%' }} /> */}

          <TextField id="standard-textarea"
            //   label=
            placeholder="Heading"
            multiline
            variant="standard"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{ width: '95%', margin: '18px', }}
            color="secondary"
          />

          <TextField id="standard-textarea"
            //   label="Subheading"
            placeholder="Subheading"
            multiline
            variant="standard"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{ width: '95%', margin: '18px' }}
          />
          {heading}{subHeading}
          {/* {fieldComponent} */}
          {para.map((object, index) => {
            return (
              <div style={{ width: '95%', margin: '10px' }} >
                <Select
                  labelId="type_select"
                  id={"para_" + index}
                  value={typee[index]}
                  label="Type"
                  onChange={(e) => handleSelectChange(e, index)}
                  style={{ maxWidth: "10%" }}
                  // size="small"
                  >
                  
                  <MenuItem value={"Heading"}>h1</MenuItem>
                  <MenuItem value={"Subheading"}>h2</MenuItem>
                  <MenuItem value={"Paragraph"}>p</MenuItem>
                </Select>
                <TextField
                  id="standard-textarea"
                  placeholder="Write here"
                  multiline
                  variant="standard"
                  value={para[index]}
                  onChange={(e) => handleChange(e, index)}
                  style={{ width: '75%', margin: '10px' }}
                />

                <Button shape="circle" size="middle" style={{ marginRight: '1%' }}
                  onClick={(e) => addField(e, index)}><PlusOutlined /></Button>

                <Button shape="circle" size="middle"
                  onClick={(e) => deleteField(e, index)}><MinusOutlined /></Button>
              </div>
            );
          })}
          <Button shape="circle" size="large" style={{padding:'0'}} onClick={handlePrevious}>
          <LeftCircleOutlined style={{fontSize:'39px', color: '#08c'}} />
          </Button>
          <Button shape="circle" size="large" style={{padding:'0'}} onClick={handleNext}>
          <RightCircleOutlined style={{fontSize:'39px', color: '#08c'}} />
          </Button>

          {/* </Space> */}
        </Col>
      </Row>
    </>
  );

}