import { Row, Col } from "antd";
import { Typography } from "antd";
import { ReadOutlined, FireOutlined, EyeFilled } from "@ant-design/icons";
import "../css/home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateToMonthYearFormat } from "../Date";
import api from "../../service/ServiceCall";
import { Response } from "../../service/Response";
import BuzzAvatar from "../BuzzAvatar";
import BlankImage from "./BlankImage";

const { Text, Title } = Typography;

export default function BuzzCard(props) {
  const [img, setImg] = useState(false);

  useEffect(() => {
    console.log((props?.data?.imageLink).includes('\http'))
    // setImg(JSON.parse(props.data.imageLink).url)
    // :
    setImg(props.data.imageLink)
  }, [props?.data?.imageLink]);

  if (props === undefined || props.data === undefined) {
    return <Response statusCode={404} />;
  }

  const authorname = props.data.authorname;
  const title = props.data.title;
  const summary = props.data.summary;
  const publishDate = DateToMonthYearFormat(props.data.publishDate);
  const readTime = props.data.readTime;
  const authorLink = props.data.authorLink;
  const articleLink = props.data.link;

  const likes = props.data.likes;
  const views = props.data.views;
  const userId = props.data.authorId;

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "8px 4px 4px 4px",
        borderRadius: "20px 20px",
        height: "100%",
        width: "100%",
      }}
    >
      <Row>
        <Col offset={1} span={16}>
          {/* author name start*/}
          <Link to={authorLink}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "34px",
                width: "100%",
              }}
            >
              <BuzzAvatar type="small" userId={userId} />
              <span
                id="author"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "0px 22px 0px 0",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <Text>{authorname}</Text>
              </span>
            </div>
          </Link>
          {/* author name end */}

          {/* heading start */}
          <Link to={articleLink}>
            <div style={{ minHeight: "120px" }}>
              <Title
                level={4}
                style={{
                  fontWeight: "500",
                  marginBottom: "5px",
                }}
                ellipsis={{ rows: 2 }}
              >
                {title}
              </Title>
              {/* heading end */}

              {/* subheading start (small intro) */}
              <Title
                level={5}
                ellipsis={{ rows: 2 }}
                style={{ marginTop: 0, fontWeight: "400", color: "grey" }}
              >
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
              {publishDate + " "}
              <ReadOutlined style={{ color: "#757575" }} />
              <Text>{" " + readTime + " "}</Text>
              {/* <RiseOutlined style={{color:'#01579b'}} /> */}
              <EyeFilled style={{ color: "#757575" }} />
              <Text>{" " + views + " "}</Text>

              <FireOutlined style={{ color: "#f50057" }} />
              <Text>{" " + likes + " "}</Text>
            </Text>
          </div>
          {/* </Space> */}
          {/* card footer end */}
        </Col>

        <Col span={6} style={{ position: "relative" }}>
          {/* image start */}
          <div
            style={{
              maxHeight: "130px",
              maxWidth: "200px",
              height: "100%",
              width: "95%",
              marginRight: "0",
              marginLeft: "auto",
              position: "absolute",
              top: "19%",
            }}
          >
            {img ? (
              <img
                id="image"
                alt="unable to load"
                className="imghover"
                style={{ height: "100%", width: "100%" }}
                src={img}
              />
            ) : (
              <BlankImage />
            )}
          </div>
          {/* image end */}
        </Col>
        <Col span={1}></Col>
      </Row>
    </div>
  );
}
