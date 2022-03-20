import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TextField } from "@mui/material";
import { Button, Col, Divider, message, Radio, Row, Select } from "antd";
import { useState } from "react";
import SearchUp from "../../components/SearchUp";
import api from "../../service/ServiceCall";
import Preview from "./Preview";

const { Option } = Select;

export default function Create(props) {
  const [title, setTitle]       = useState("");
  const [summary, setSummary] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); 
  const [contentType, setContentType]   = useState(["head"]);
  const [content, setContent]             = useState([""]);
  const [imageList, setImageList]   = useState([]);
  const [firstImage, setFirstImage]   = useState("");
  const [esimatedTime, setEstimatedTime] = useState(1);
  const maxLengthOfContent = 20;
  const maxLengthOfImageList = 5;
  const MAX_COUNT = 255;

  const reset = () => {
    setContent([""]);
    setContentType(["head"]);
    setImageList([]);
  }

  const wordCount = (line) => {
    // On Average we read 200-250 words per minute
    let timeDump = parseInt(line.split(" ").length / 200)
    setEstimatedTime(Math.max(timeDump,1))
  } 
  // this will manage change in text
  const handleChange = (event, position) => {
    // copying from previous stored value in content
    let updatedcontent = [...content];
    updatedcontent[position] = event.target.value;
    setContent(updatedcontent);
    // word counting merging content array in string 
    wordCount(updatedcontent.join(' '));
  };

  function handleImageSearch (url, position) {
    //max image list = [image1, image2] limit
    if ((imageList.length? imageList.length:0)+1 > maxLengthOfImageList){
      message.error("Max no of images reached");
      message.warning("Please delete it using bin icon");
    }
    else{
      let updatedcontent = [...content], updatedImageList = [...imageList];
      // image position stored in content using image list length
      updatedcontent[position] = url;
      if (firstImage === ""){ setFirstImage(JSON.parse(url).url); } 
      // pusing image in seprate array imagelist 
      updatedImageList.push(url);
  
      setContent(updatedcontent);
      setImageList(updatedImageList);
      // console.log(imageData);
    }
  }

  // this will manage change in images upon selecion
  // function handleImage (imageData, position) {
  //   //max image list = [image1, image2] limit
  //   if ((imageList.length? imageList.length:0)+1 > maxLengthOfImageList){
  //     message.error("Max no of images reached");
  //     message.warning("Please delete it using bin icon");
  //   }
  //   // max image size (individual)
  //   else if (imageData!== undefined && parseInt(imageData.size/1024) >= (2048) ){
  //     message.error("Exceeds max size of 2Mb");
  //     message.warning("Please delete it using bin icon");
  //   }
  //   else{
  //   let updatedcontent = [...content], updatedImageList = [...imageList];
  //   // image position stored in content using image list length
  //   updatedcontent[position] = imageData.name;
  //   if (firstImage === ""){ setFirstImage(imageData.name); } 
  //   // pusing image in seprate array imagelist 
  //   updatedImageList.push(imageData);

  //   setContent(updatedcontent);
  //   setImageList(updatedImageList);
  //   // console.log(imageData);
  //   }
  // };
  
  const addField = (event, pos) => {
    console.log(content.length+1);
    if ((content.length? content.length:0)+1 > maxLengthOfContent){
      message.error("Max content length reached");
    }
    else{

    let oldcontent = [...content], oldType = [...contentType];

    oldcontent.splice(pos+1, 0, "");
    oldType.splice(pos+1, 0, "head");

    setContent(oldcontent);
    setContentType(oldType);
    }
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

  }

  function handleTags(value) {
    setSelectedTags(value);
    console.log("selected tags : " + selectedTags);
  }

  const tags = [
    "Business", "BlockChain", "Technology", "Innovation", "Startup", "Bitcoin",
    "Science", "Space", "Medicine", "React", "JavaScript", "SpringBoot", "Crypto",
    "Rocket", "Nature", "Health"
  ];

  const data = {
    userId: 'you',
	  title: title,
	  summary: summary,
    imagelist: imageList,
    firstImage: firstImage,
	  content: content,
    contentType : contentType,
	  readTime: esimatedTime,
    authorName: localStorage.getItem('you')!==null ? JSON.parse(localStorage.getItem('you'))?.name:'Your name',
    authorLink: api.getProfileUrl('you'),
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
            mode="tags"
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
                      <>
                      {/* <UploadButton imageData={(e) => handleImage(e, index)} /> */}
                      <SearchUp imageUrl={(e) => handleImageSearch(e, index)} />
                      </>
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