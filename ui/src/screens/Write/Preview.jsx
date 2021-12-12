import LazyLoad from "react-lazyload";
import Topics from "../../components/home/Topics";
import { Response } from "../../service/Response";
import { convertDate, DateToMonthYearFormat } from "../../components/Date";
import { Row, Col, Typography } from "antd";
import { Space } from "antd";
import { ReadOutlined} from "@ant-design/icons";
import BuzzAvatar from "../../components/BuzzAvatar";
const { Title, Text } = Typography;

export default function Preview(props) {
  console.log(props.data);
  if (
    props.data === undefined ||
    props.data.title === undefined ||
    props.data.summary === undefined
  ) {
    return <Response statusCode={404} />;
  }

  const authorName = props.data.authorName;
  const publishDate = DateToMonthYearFormat(
    props.data.publishDate ? props.data.publishDate : convertDate(new Date())
  );
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;
  const userId = props.data.userId;

  const title = props.data.title || "Empty Title";
  const summary = props.data.summary || "Empty Recap";
  const content = props.data.content;
  const contentType = props.data.contentType;
  let imageList = props.data.imagelist;
  let index = -1;

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
      index += 1;
      // console.log(imageList[index])
      let unsplashlink = "https://unsplash.com/";
      return (
      <>
        <div style={{ maxHeight: "400px", maxWidth: "100%" }}>
          <LazyLoad once>
            <img
              src={
                typeof imageList[index] === "object"
                  ? URL.createObjectURL(imageList[index]) : (
                  imageList[index]? JSON.parse(imageList[index]).url : ""
                  )
              }
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
          </LazyLoad>
        </div>
        <div>
        {imageList[index]?
          <div style={{ padding:'8px 2% 8px 15%'}}>
            <Text strong italic>
              {"Photo by "}
              <a href={`${JSON.parse(imageList[index]).profileUrl}?utm_source=image-search&utm_medium=referral`}>
                {JSON.parse(imageList[index]).name}
              </a>
              {" on "}
              <a href={`${unsplashlink}?utm_source=image-search&utm_medium=referral`}>
                Unsplash
              </a>
            </Text>
          </div>
          :
          <></>
        }
        </div>
      </>
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
                <Text style={{ fontWeight: "500" }}>{authorName}</Text>
                <Text style={{ marginLeft: "10px" }}>
                  {publishDate}
                  <Text style={{ marginLeft: "10px" }}>
                    <ReadOutlined style={{ color: "#757575" }} />
                    {" " + readTime + " min"}
                  </Text>
                </Text>
              </span>
            </div>
          </a>

          <Title
            level={1}
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
            style={{ textAlign: "center", fontWeight: "450" }}
          >
            {summary}
          </Title>

          {content.map((point, i) => mapData(contentType[i], point))}

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
