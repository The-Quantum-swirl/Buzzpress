import { useState, useCallback } from "react";
import Preview from "./Preview";
import { Row, Col, Divider } from "antd";
import { Button, Radio, Select } from "antd";
import { TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import UploadButton from "../../components/UploadButton";
import Topics from "../../components/home/Topics";
import { profileUrl } from "../common/Path.js";

const { Option } = Select;

export default function Create(props) {
  const [title, setTitle]       = useState("");
  const [summary, setSummary] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [contentType, setContentType]   = useState(["head"]);
  const [content, setContent]             = useState([""]);
  const [imageList, setImageList]   = useState([]);
  const [firstImage, setFirstImage]   = useState("");

  const authorId = 123;
  const MAX_COUNT = 255;

  const reset = () => {
    setContent([""]);
    setContentType(["head"]);
    setImageList([]);
  }
  const handleChange = (event, position) => {
    let updatedcontent = [...content];
    updatedcontent[position] = event.target.value;
    setContent(updatedcontent);
  };

  function handleImage (imageData, position) {
    let updatedcontent = [...content], updatedImageList = [...imageList];
    // image position stored in content using image list length
    updatedcontent[position] = imageData.name;
    if (firstImage === ""){ setFirstImage(imageData.name); } 
    // pusing image in seprate array imagelist 
    updatedImageList.push(imageData);

    setContent(updatedcontent);
    setImageList(updatedImageList);
    
  };

  const addField = (event, pos) => {
    let oldcontent = [...content], oldType = [...contentType];

    oldcontent.splice(pos+1, 0, "");
    oldType.splice(pos+1, 0, "head");

    setContent(oldcontent);
    setContentType(oldType);

    console.log("Var content = "+content+ "|| Var contentType = "+contentType);
  };

  const deleteField = (event, pos) => {
    if (content.length === 1){
      content.pop();
      reset();
      return;
    }

    let oldcontent = [...content], oldType = [...contentType];

    oldcontent.splice(pos, 1);
    oldType.splice(pos, 1);

    setContent(oldcontent);
    setContentType(oldType);
  };

  function handleSelectChange(e, index) {
    let inparr = [...contentType];
    inparr[index] = e.target.value;
    setContentType(inparr);

    console.log("change is called");
    console.log("Var content = "+content+ "|| Var contentType = "+contentType);
  }

  function handleTags(value) {
    setSelectedTags(value);
    console.log("selected tags : " + selectedTags);
  }

  const tags = ["Technology", "Startup", "Business", "Innovation",
    "Science", "Space", "Medicine", "React", "JavaScript", "SpringBoot"
  ];

  const data = {
	  title: title,
	  summary: summary,
    imagelist: imageList,
    firstImage: firstImage,
	  content: content,
    contentType : contentType,
	  readTime: 5,
    authorLink: profileUrl+authorId,
    tag: selectedTags,
  }
  props.data(data);
  return (
    <>
      <Row style={{ marginTop: "2%" }}>
        <Col className="mobile desktop" style={{ width: '100%' }}>
          {/* Create screen starts */}
          {/* title starts */}
          <TextField
            id="standard-textarea"
            margin="dense"
            inputProps={{maxlength: MAX_COUNT}}
            helperText={`${title.length}/${MAX_COUNT}`}
            placeholder="Title"
            multiline
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "90%", marginLeft: "15px" }}
            color="secondary"
          />
          {/* title ends */}
          {/* Recap starts */}
          <TextField
            id="standard-textarea"
            margin="dense"
            inputProps={{maxlength: MAX_COUNT}}
            helperText={`${summary.length}/${MAX_COUNT}`}
            placeholder="Recap"
            multiline
            variant="standard"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ width: "90%", marginLeft: "15px" }}
          />
          {/* Recap ends */}

          <Select
            mode="multiple"
            placeholder="Select tags"
            onChange={handleTags}
            optionLabelProp="label"
            style={{ width: '90%', margin: '15px', }}
          >
            {tags.map((tag) => {
              return (
                <Option value={tag} label={tag}>
                  {tag}
                </Option>
              );
            })}
          </Select>

          {/* Appendable fields starts */}
          {content.map((object, index) => {
            return (
              <div style={{ margin: "15px" }}>
                {/* radio buttons for selecting head/ subhead/ image upload */}
                <Radio.Group
                  defaultValue="title"
                  buttonStyle="solid"
                  size="middle"
                  value={contentType[index]}
                  onChange={(e) => handleSelectChange(e, index)}
                >
                  <Radio.Button  value="head">Head</Radio.Button>
                  <Radio.Button  value="text">Text</Radio.Button>
                  <Radio.Button  value="code">Code</Radio.Button>
                  <Radio.Button  value="image">Image</Radio.Button>
                </Radio.Group>

                <Row style={{ marginTop: "20px" }}>
                  <Col span={17}>
                    {/* Changeable field upload/ textfield starts */}
                    {contentType[index] === "image" ? (
                      <UploadButton imageData={(e) => handleImage(e, index)} />
                    ) : (
                      <TextField
                        id="standard-textarea"
                        placeholder="Write here"
                        multiline
                        variant="standard"
                        value={content[index]}
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
                      icon={<PlaylistAddIcon style={{color: '#0D4F8B'}} />}
                      shape="circle"
                      size="middle"
                      style={{ marginRight: "1%" }}
                      onClick={(e) => addField(e, index)}
                    />
                    {/* plus ends */}

                    {/* minus ( - ) starts */}
                    <Button
                      icon={<DeleteOutlineIcon style={{color:'f70d1a'}} />}
                      shape="circle"
                      size="middle"
                      onClick={(e) => deleteField(e, index)}
                    />
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
      <Divider>Live Preview</Divider>
      <Preview data={data} />
    </>
  );
}