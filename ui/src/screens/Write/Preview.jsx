import { useState } from "react";
import Topics from "../../components/home/Topics";
import { convertDate, DateToMonthYearFormat } from "../common/Miscellaneous";
import { Row, Col, Typography } from "antd";
import { Avatar, Space, Button } from "antd";
import { UserOutlined, FireFilled, FireOutlined } from "@ant-design/icons";
const { Title, contentgraph, Text } = Typography;

const checkURL = (url) => {
  if (typeof url === "string")
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  return false;
};

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
  const publishDate = DateToMonthYearFormat(convertDate(new Date()));
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;

  const title = props.data.title || "Empty Title";
  const summary = props.data.summary || "Empty Recap";
  const content = props.data.content;
  const contentType = props.data.contentType;
  const fireCount = props.data.fireCount || 0;
  const imageList = props.data.imagelist || [];

  var temp = "";
  function handleFire() {
    setOnFire(!onFire);
  }

  const mapData = (type, val) => {
    if (type === "head")
      return (
        <Title level={2} style={{ fontWeight: "500" }}>
          {val}
        </Title>
      );
    else if (type === "text")
      return (
        <Title level={4} style={{ fontWeight: "450" }}>
          {val}
        </Title>
      );
    else if (type === "code") return <Text code> {val}</Text>;
    else if (type === "image") {
      const foundImage = imageList.find((img) => (img.name === val || img.indexOf(val) !== -1 ) );
      temp = foundImage;
      console.log(val);
      if (typeof foundImage === "object") {
        temp = URL.createObjectURL(foundImage);
      }
      return (
        <div style={{ maxHeight: "400px", maxWidth: "100%" }}>
          <img
            src={temp}
            alt="unable to load"
            loading="lazy"
            style={{
              height: "100%",
              maxHeight: "400px",
              width: "auto",
              display: "block",
              margin: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
      );
    } else return <Text>{val}</Text>;
  };
  return (
    <>
      <Row justify="center" style={{ marginTop: "5%" }}>
        <Col className="desktop mobile">
          <a href={authorLink} target="_blank" rel="noreferrer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
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
                  display:'inline-flex' , alignItems:'center'
                }}
              >
                <Text style={{ fontWeight: "500" }}>{authorName}</Text>
                <Text style={{ marginLeft: "10px" }}>
                  {publishDate}
                  <Text style={{ marginLeft: "10px" }}>
                    {readTime + " min read"}
                  </Text>
                </Text>
              </span>
            </div>
          </a>

          <Title
            level={1}
            ellipsis={{ rows: 2 }}
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {title}
          </Title>
          <Title
            level={3}
            ellipsis={{ rows: 2 }}
            style={{ textAlign: "center", fontWeight: "450" }}
          >
            {summary}
          </Title>

          {content.map((point, i) => mapData(contentType[i], point))}

          <div
            style={{
              margin: "auto",
              marginTop: "50px",
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              borderRadius: "200px",
              padding: "2px 12px 2px",
              display: "table",
            }}
          ></div>

          <div style={{ margin: "auto", padding: "20px 12px 10px 12px" }}>
            <Space
              wrap={true}
              style={{ justifyContent: "center", display: "flex" }}
            >
              {tag.map((topic) => (
                <Topics data={topic} />
              ))}
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
}
