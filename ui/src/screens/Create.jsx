import NavBar from "../components/NavBar";
import { useState } from "react";
import { Steps, Row, Col } from 'antd';
import { Button, Input, Select, Space, Divider } from 'antd';
import { TextField } from '@mui/material';
const { TextArea } = Input;
const { Step } = Steps;

export default function Create() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  let [para, setPara] = useState([""]);

  function handleChange(event, position) {
    let oldPara = para;
    oldPara[position] = event.target.value;
    setPara(oldPara);
  }

  function handleFieldChange(event, pos) {
    console.log(pos);
    let oldPara = [...para];
    oldPara.splice(pos + 1, 0, "");
    console.log(oldPara);
    setPara(oldPara);
  }

  return (
    <>
      <NavBar />
      <Row>

        <Col offset={6} span={12}>
          {/* <Space direction="vertical"> */}

          <Steps size="default" current={0} style={{ marginTop: '3%', padding: '2%' }}>
            <Step title="Create" />
            <Step title="Preview" />
            <Step title="Share" />
          </Steps>

          <Divider style={{ margin: '1% 0 5% 0', width: '100%', minWidth: '30%' }} />

          <TextField
            id="standard-textarea"
            //   label=
            placeholder="Heading"
            multiline
            variant="standard"
            //   value={draft[0]} 
            onChange={(e) => setHeading(e.target.value)}
            style={{ width: '100%', marginBottom: '28px' }}
          />

          <TextField
            id="standard-textarea"
            //   label="Subheading"
            placeholder="Subheading"
            multiline
            variant="standard"
            //   value={draft[1]}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{ width: '100%', marginBottom: '28px' }}
          />

          {/* {fieldComponent} */}
          {para.map((object, index) => {
            return (
              <>
                <TextField
                  id="standard-textarea"
                  placeholder="Write here"
                  multiline
                  variant="standard"
                  // value={object}
                  onChange={(e) => { handleChange(e, index) }}
                  style={{ width: '90%', marginBottom: '28px', marginRight: '15px' }}
                />
                <Button shape="circle" size="large"
                  onClick={(e) => handleFieldChange(e, index)}>+</Button>
              </>
            );
          })}

          {/* </Space> */}
        </Col>
      </Row>
    </>
  );

}