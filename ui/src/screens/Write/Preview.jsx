import { useState } from "react";
import Topics from "../../components/home/Topics";
import { Row, Col, Typography } from "antd";
import { Avatar, Space, Button } from "antd";
import { UserOutlined, FireFilled, FireOutlined } from "@ant-design/icons";
const { Title, contentgraph, Text } = Typography;

const DateToMonthYearFormat = (date) => {
  let todaysDate = date.toDateString();
  let dateArr = todaysDate.split(" ");
  return dateArr[1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[3];
};
const isBase64 = (str) => {
  return str.includes("data:image") || str.includes("http://");
}
const checkURL = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
}

const isImage =(data) =>{
  if (isBase64(data)) return true;
  else if (checkURL(data)) return true;

  return false;
}
export default function Preview(props) {
  const [onFire, setOnFire] = useState(false);
  console.log(props.data);
  if (
    props.data === undefined ||
    props.data.title === undefined ||
    props.data.summary === undefined 
    // props.data.content === undefined ||
    // props.data.contentType === undefined ||
    // props.data.imageList === undefined
  ) {
    return <> Err occured in Preview !!! </>;
  }
  
  const authorName = "Derick David";
  const publishDate = DateToMonthYearFormat(new Date());
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;

  const title = props.data.title || "Empty Title";
  const summary = props.data.summary || "Empty Recap";
  const content = props.data.content;
  const contentType = props.data.contentType;
  const fireCount = props.data.fireCount || 0;
  const imageList = props.data.imagelist || [];

  var temp="";
  function handleFire(){
    setOnFire(!onFire) ;
  }

  const contentMap = { title: 3, content: 4};
  const mapData = (type, val) => {
    if (type === 'head') return <Title level={2} style={{fontWeight:'500'}}> {val}</Title>;
    else if (type === 'text') return  <Title level={4} style={{fontWeight:'450'}}> {val}</Title>;

  }
  return (
    <>
      <Row justify="center" style={{ marginTop: "5%" }}>
        <Col className="desktop mobile">
        <a href={authorLink} target="_blank" rel="noreferrer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: 'center',
                height: "34px",
                width: "100%",
              }}
            >
              <Avatar
                style={{
                  width: "34px",
                  height: "34px",
                  backgroundColor: "blue",
                }}
                icon={<UserOutlined />}
              />
              <span
                id="author"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "0px 22px 0px 0",
                }}
              >
                <Text style={{fontWeight:'500'}}>{authorName}</Text>
                <Text style={{ marginLeft: "10px"}}>
                {publishDate}
                <Text style={{ marginLeft: "10px" }}>
                  {readTime + " read"}
                </Text>
                
                {/* <Button shape="round" icon={onFire ? <FireFilled style={{color:'#f50057'}} /> : 
                <FireOutlined style={{color:'#f50057'}} />} 
                onClick={handleFire}
                style={{backgroundColor:'inherit', border:'0'}} >
                {fireCount+ (onFire? 1:0)}
                </Button> */}
              </Text>
              </span>
            </div>
          </a>

          <Title
            level={1} ellipsis={{ rows: 2 }}
            style={{ marginTop: "15px", marginBottom: "5px", fontWeight: "700", textAlign:'center' }}
          >
            {title}
          </Title>
          <Title level={3} ellipsis={{ rows: 2 }} style={{ textAlign:'center', fontWeight:'450'}}>
            {summary}
          </Title>

          {content.map((point, i) => {
            typeof point === 'number' && point < imageList.length ? temp = URL.createObjectURL(imageList[point]) : temp=point

            return isImage(temp) ? (
              <div style={{maxHeight:'400px', maxWidth:'100%'}}>
              <img
                src={temp}
                alt="unable to load"
                style={{height:'100%',maxHeight:'400px', width:'auto',display:'block', margin:'auto', maxWidth:'100%' }}
              />
              </div>
            ) : (
              mapData(contentType[i], temp)
            );
          })}
          
          {/* <Title level={contentMap[ contentType[i] ]}>{point}</Title> */}
          <div
            style={{
              margin:'auto',
              marginTop:'50px',
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              borderRadius: "200px",
              padding: "2px 12px 2px",
              display: "table",
            }}
          >
            
          </div>

          <div style={{margin:'auto', padding: "20px 12px 10px 12px",}}>
          <Space wrap={true} style={{justifyContent:'center',display:'flex'}}>
            {tag.map((topic) => <Topics data={topic} />)}
          </Space>
          </div>

        </Col>
      </Row>
      
      
    </>
  );
}
