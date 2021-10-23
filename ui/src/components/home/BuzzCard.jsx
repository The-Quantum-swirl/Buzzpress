import { Row, Col, Space, Button } from "antd";
import { Typography, Avatar } from "antd";
import { UserOutlined, FireFilled, FireOutlined } from "@ant-design/icons";
import "../css/home.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
const { Text, Title } = Typography;

const sqlDateToMonthYearFormat = (sqlDate) => {
  let dateArr = sqlDate.split("-");
  let articleDate = new Date(
    dateArr[0],
    (Number(dateArr[1]) - 1).toString(),
    dateArr[2].substr(0, 2)
  );
  let convertedDate = articleDate.toDateString();
  dateArr = convertedDate.split(" ");
  return dateArr[1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[3];
};

export default function BuzzCard(props) {
  const [onFire, setOnFire] = useState(false);
  if (props === undefined || props.data === undefined) {
    console.log("data unable to load");
    return <> </>;
  }
  
  const authorname = props.data.authorname;
  const title = props.data.title;
  const summary = props.data.summary;
  const publishDate = sqlDateToMonthYearFormat(props.data.publishDate);
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;
  const articleLink = props.data.link;
  const imageLink = props.data.imageLink;
  const fireCount = props.data.fireCount;

  function handleFire(){
    setOnFire(!onFire) ;
  }
  return (
    <>
      <Row style={{padding:'5px'}}>
        <Col span={17} style={{ padding: "5px" }}>
          {/* author name start*/}
          <Link to={authorLink} >
            <div
              // style={{ display: "table" }}
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
                  // display: "table-cell",
                }}
                icon={<UserOutlined />}
              />
              <span
                id="author"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "0px 22px 0px 0",
                  // display: "table-cell",
                  // verticalAlign:'middle',
                  // textAlign:'center'
                }}
              >
                <Text
                // style={{ display: "table-cell", verticalAlign: "middle" }}
                >
                  {authorname}
                </Text>
              </span>
            </div>
            {/* <div style={{ height: "26px", overflow: "hidden" }}> */}
            {/* <Title level={5} ellipsis={true}>
              {authorname}
            </Title> */}
          </Link>
          {/* author name end */}

          {/* heading start */}
          <Link to={articleLink}>
            <div style={{ minHeight: "120px" }}>
              <Title
                level={4}
                style={{
                  fontWeight: "700",
                  marginBottom:'5px'
                }}
                ellipsis={{ rows: 2 }}
              >
                {title}
              </Title>
              {/* heading end */}

              {/* subheading start (small intro) */}
              <Title level={5} ellipsis={{ rows: 2 }} style={{marginTop:0, fontWeight:'450'}}>
                {summary}
              </Title>
            </div>
          </Link>
          {/* subheading end */}

          {/* card footer start */}
          {/* <Space direction="vertical" wrap={true}> */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                borderRadius: "200px",
                padding: "2px 12px 2px",
                display: "table",
              }}
            >
              <Text style={{ display: "table-cell", verticalAlign: "middle" }}>
                {publishDate +" "+ readTime + " read "}
                
                <Button shape="round" icon={onFire ? <FireFilled style={{color:'#f50057'}} /> : 
                <FireOutlined style={{color:'#f50057'}} />} 
                onClick={handleFire}
                style={{backgroundColor:'inherit', border:'0', padding:'4px'}} >
                {fireCount+ (onFire? 1:0)}
                </Button>

              </Text>
            </div>
          {/* </Space> */}
          {/* card footer end */}
        </Col>

        <Col span={7} style={{ position: "relative" }}>
          {/* image start */}
          <div
            style={{
              maxHeight: "130px",
              maxWidth: "200px",
              height: "100%",
              width: "100%",
              marginRight: "0",
              marginLeft: "auto",
              position: "absolute",
              top: "19%",
            }}
          >
            <img
              id="image"
              alt="unable to upload"
              className="imghover"
              style={{ height: "100%", width: "100%" }}
              src={imageLink}
            />
          </div>
          {/* image end */}
        </Col>
      </Row>

      {/* <Space wrap={true}>
        {tag.filter((item, idx) => idx < 4).map((topic) => <Topics data={topic} />)}
      </Space> */}
    </>
  );
}
