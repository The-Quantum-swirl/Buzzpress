import { useState } from "react";
import Topics from "../../components/home/Topics";
import { Row, Col, Typography } from "antd";
import { Avatar, Space, Button } from "antd";
import { UserOutlined, FireFilled, FireOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;

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
  if (
    props.data === undefined ||
    props.data.head === undefined ||
    props.data.subHead === undefined ||
    props.data.paragraph === undefined
  ) {
    return <> Err occured in Preview !!! </>;
  }
  
  const authorName = "Derick David";
  const publishDate = DateToMonthYearFormat(new Date());
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;

  const heading = props.data.head || "Empty Title";
  const subHeading = props.data.subHead || "Empty Recap";
  const para = props.data.paragraph;
  const paraType = props.data.paraType;
  const fireCount = props.data.fireCount || 0;
  var temp="";
  function handleFire(){
    setOnFire(!onFire) ;
  }

  const paraMap = { heading: 3, para: 4};
  const mapData = (type, val) => {
    if (type === 'heading') return <Title level={2} style={{fontWeight:'500'}}> {val}</Title>;
    else if (type === 'para') return  <Title level={4} style={{fontWeight:'450'}}> {val}</Title>;

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
              </span>
            </div>
          </a>

          <Title
            level={1} ellipsis={{ rows: 2 }}
            style={{ marginTop: "15px", marginBottom: "5px", fontWeight: "700", textAlign:'center' }}
          >
            {heading}
          </Title>
          <Title level={3} ellipsis={{ rows: 2 }} style={{ textAlign:'center', fontWeight:'450'}}>
            {subHeading}
          </Title>

          {para.map((point, i) => {
            typeof point === 'object' ? temp = URL.createObjectURL(point) : temp=point

            return isImage(temp) ? (
              <div style={{width:'100%', height:'auto'}}>
              <img
                src={temp}
                alt="unable to load"
                style={{ width: '100%', height:'100%', marginBottom:'15px' }}
              />
              </div>
            ) : (
              mapData(paraType[i], temp)
            );
          })}
          
          {/* <Title level={paraMap[ paraType[i] ]}>{point}</Title> */}
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
            <Text style={{ display: "table-cell", verticalAlign: "middle" }}>
              {publishDate}
              <Text style={{ marginLeft: "10px" }}>
                {readTime + " read"}
              </Text>
              
              <Button shape="round" icon={onFire ? <FireFilled style={{color:'#f50057'}} /> : 
              <FireOutlined style={{color:'#f50057'}} />} 
              onClick={handleFire}
              style={{backgroundColor:'inherit', border:'0'}} >
              {fireCount+ (onFire? 1:0)}
              </Button>
            </Text>
          </div>

          <div style={{margin:'auto', padding: "20px 12px 10px 12px",}}>
          <Space wrap={true}>
            {tag.map((topic) => <Topics data={topic} />)}
          </Space>
          </div>

        </Col>
      </Row>
      
      
    </>
  );
}
