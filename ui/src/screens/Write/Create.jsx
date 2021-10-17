import { useState, useCallback } from "react";
import Preview from "./Preview";
import { Row, Col, Divider } from "antd";
import { Button, Radio } from "antd";
import { TextField } from "@mui/material";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import UploadButton from "../../components/UploadButton";
import Topics from "../../components/home/Topics";
import { Select } from 'antd';

const { Option } = Select;

export default function Create() {
  const [heading, setHeading]       = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputType, setInputType]   = useState(["heading"]);
  const [para, setPara]             = useState([""]);

  const handleChange = (event, position) => {
    let updatedPara = [...para];
    updatedPara[position] = event.target.value;
    setPara(updatedPara);
  };

  function handleImage (imageData, position) {

    // if (imageData !== undefined){
    //   // call back function to wait till image is loaded in array
    //   // function CallImage () {
    //   //   if (imageData.thumbUrl !== undefined){
    //   //     console.log("image not undefined");
    //   //     console.log(URL.createObjectURL(imageData.thumbUrl));
    //   //     console.log(imageData.thumbUrl);          
    //   //   }
    //   //   else {
    //   //     setTimeout(CallImage, 5000)
    //   //   };
    //   // }
    //   // CallImage();
      
    // }
    let updatedPara = [...para];
    updatedPara[position] = imageData;
    setPara(updatedPara);
  };

  const addField = (event, pos) => {
    let oldPara = [...para];
    oldPara.splice(pos+1, 0, "");
    setPara(oldPara);
	
    let oldType = [...inputType];
    oldType.splice(pos+1, 0, "heading");
    setInputType(oldType);

    console.log("Var para = "+para+ "|| Var inputType = "+inputType);
  };

  const deleteField = (event, pos) => {
    if (para.length === 1) return;

    let oldPara = [...para];
    oldPara.splice(pos, 1);
    setPara(oldPara);

    let oldType = [...inputType];
    oldType.splice(pos, 1);
    setInputType(oldType);
  };

  function handleSelectChange(e, index) {
    // console.log(e);
    let inparr = [...inputType];
    inparr[index] = e.target.value;
    setInputType(inparr);

    console.log("change is called");
    console.log("Var para = "+para+ "|| Var inputType = "+inputType);

  }

  function handleTags(value) {
    setSelectedTags(value);
    console.log("selected tags : "+ selectedTags);
  }

  const tags = ["Technology", "Startup", "Business", "Innovation",
   "Science", "Space", "Medicine", "React", "JavaScript", "SpringBoot"
  ];
  
  const data = {
	  head:heading,
	  subHead: subHeading,
	  paragraph: para,
    paraType : inputType,
	  readTime: "5 min",
    authorLink: "https://drckangelo.medium.com/?source=post_page-----8f2258f81899--------------------------------",
    tag: selectedTags,
  }
  return (
    <>
      <Row style={{ marginTop: "2%" }}>
        <Col className="mobile desktop" style={{width:'100%'}}>
          {/* Create screen starts */}
          {/* Heading starts */}
          <TextField
            id="standard-textarea"
            placeholder="Title"
            multiline
            variant="standard"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{ width: "90%", margin: "15px" }}
            color="secondary"
          />
          {/* Heading ends */}
          {/* Recap starts */}
          <TextField
            id="standard-textarea"
            placeholder="Recap"
            multiline
            variant="standard"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{ width: "90%", margin: "15px" }}
          />
          {/* Recap ends */}

          <Select
          mode="multiple"
          placeholder="Select tags"
          onChange={handleTags}
          optionLabelProp="label"
          style={{width:'90%', margin:'15px',}}
          >
          {tags.map( (tag) => {
            return (
            <Option value={tag} label={tag}>
            {tag}
            </Option>
            );
          })}
          </Select>

          {/* Appendable fields starts */}
          {para.map((object, index) => {
            return (
              <div style={{ margin: "15px" }}>
                {/* radio buttons for selecting head/ subhead/ image upload */}
                <Radio.Group
                  defaultValue="heading"
                  buttonStyle="solid"
                  size="middle"
                  value={inputType[index]}
                  onChange={(e) => handleSelectChange(e, index)}
                >
                  <Radio.Button  value="heading">Head</Radio.Button>
                  <Radio.Button  value="para">Para</Radio.Button>
                  <Radio.Button  value="image">Image</Radio.Button>
                </Radio.Group>

                <Row style={{ marginTop: "20px" }}>
                  <Col span={17}>
                    {/* Changeable field upload/ textfield starts */}
                    {inputType[index] === "image" ? (
                      <UploadButton imageData={(e) => handleImage(e, index)} />
                    ) : (
                      <TextField
                        id="standard-textarea"
                        placeholder="Write here"
                        multiline
                        variant="standard"
                        value={para[index]}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: "100%", marginRight: "1%" }}
                      />
                    )}
                    {/* Changeable field ends */}
                  </Col>
                  {/* action +, - starts */}
                  <Col offset={1} span={6}>
                    {/* plus ( + ) starts */}
                    <Button
                      shape="circle"
                      size="middle"
                      style={{ marginRight: "1%" }}
                      onClick={(e) => addField(e, index)}
                    >
                      <PlusOutlined />
                    </Button>
                    {/* plus ends */}

                    {/* minus ( - ) starts */}
                    <Button
                      shape="circle"
                      size="middle"
                      onClick={(e) => deleteField(e, index)}
                    >
                      <MinusOutlined />
                    </Button>
                    {/* minus ends */}
                  </Col>
                  {/* action ends */}
                </Row>
              </div>
            );
          })}
          {/* Appendable fields ends */}
          {/* Create screen ends */}
        </Col>
      </Row>
		<Divider> Preview</Divider>
		<Preview data={data} />
    </>
  );
}
