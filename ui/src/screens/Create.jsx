import NavBar from "../components/NavBar";
import { useState } from "react";
import { Steps, Row, Col } from 'antd';
import { Button, Input, Select, Space, Divider } from 'antd';
import { TextField, MenuItem } from '@mui/material';
import { PlusCircleTwoTone, MinusCircleTwoTone, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { TextField } from '@mui/material';
const { TextArea } = Input;
const { Step } = Steps;

export default function Create() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
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
  let [typee, settypee] = useState(["Pragraph"])
  function handleSelectChange(e, index) {
    console.log(e);
    // console.log(typee);
    let newtype = [...typee];
    newtype[index] = e;
    settypee(newtype);
    console.log("type change called");
  }
  return (
    <>
      <NavBar />
      <Row>

        <Col offset={4} span={16}>
          {/* <Space direction="vertical"> */}

          <Steps size="default" current={0} style={{ marginTop: '3%', padding: '2%' }}>
            <Step title="Create" />
            <Step title="Preview" />
            <Step title="Share" />
          </Steps>

          <Divider style={{ margin: '1% 0 5% 0', width: '100%', minWidth: '30%' }} />

          <TextField id="standard-textarea"
            //   label=
            placeholder="Heading"
            multiline
            variant="standard"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{ width: '95%', margin: '10px', marginBottom: '18px', }}
          />

          <TextField id="standard-textarea"
            //   label="Subheading"
            placeholder="Subheading"
            multiline
            variant="standard"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{ width: '95%', margin: '10px', marginBottom: '18px' }}
          />
          {heading}{subHeading}
          {/* {fieldComponent} */}
          {para.map((object, index) => {
            return (
              <div>
                <Select
                  labelId="type_select"
                  id={"para_" + index}
                  value={typee[index]}
                  label="Type"
                  onChange={(e) => handleSelectChange(e, index)}
                  style={{ maxwidth: "10%" }}>
                  <MenuItem value={"Heading"}>Heading</MenuItem>
                  <MenuItem value={"Subheading"}>Subheading</MenuItem>
                  <MenuItem value={"Paragraph"}>Paragraph</MenuItem>
                </Select>
                <TextField
                  id="standard-textarea"
                  placeholder="Write here"
                  multiline
                  variant="standard"
                  value={para[index]}
                  onChange={(e) => handleChange(e, index)}
                  style={{ width: '75%', margin: '10px', marginBottom: '18px', marginRight: '15px' }}
                />

                <Button shape="circle" size="large" style={{ marginRight: '15px' }}
                  onClick={(e) => addField(e, index)}><PlusOutlined /></Button>

                <Button shape="circle" size="large"
                  onClick={(e) => deleteField(e, index)}><MinusOutlined /></Button>
              </div>
            );
          })}

          {/* </Space> */}
        </Col>
      </Row>
    </>
  );

}