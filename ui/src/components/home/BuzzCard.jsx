import { Row, Col, Space } from "antd";
import { Typography } from "antd";
import "../css/home.css";

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
  if (props === undefined || props.data === undefined) {
    console.log("empty");
    return <> </>;
  }
  const authorname = props.data.authorname;
  const heading = props.data.heading;
  const subHeading = props.data.subHeading;
  const publishDate = sqlDateToMonthYearFormat(props.data.publishDate);
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;
  const articleLink = props.data.link;
  const imageLink = props.data.imageLink;

  return (
    <>
        <Row>
          <Col span={17} style={{ padding: "5px" }}>
            {/* author name start*/}
            <a href={authorLink} target="_blank" rel="noreferrer">
              {/* <div style={{ height: "26px", overflow: "hidden" }}> */}
                <Title level={5} ellipsis={true}>
                  {authorname}
                </Title>
            </a>
            {/* author name end */}

            {/* heading start */}
            <a href={articleLink} target="_blank" rel="noreferrer">
              
                <Title
                  level={3}
                  style={{
                    marginTop: "0",
                    marginBottom: "5px",
                    fontWeight: "700",
                  }}
                  ellipsis={{ rows: 2 }}
                >
                  {heading}
                </Title>
              {/* heading end */}

              {/* subheading start (small intro) */}
                <Title level={5} ellipsis={{ rows: 2 }}>
                  {subHeading}
                </Title>
            </a>
            {/* subheading end */}

            {/* card footer start */}
              <Space wrap={true} style={{ width: "70%" }}>
                <span
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: "200px",
                    padding: "2px 12px 2px",
                    display: "table",
                  }}
                >
                  <Text
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    {publishDate}
                    <Text style={{ marginLeft: "10px" }}>
                      {readTime + " read"}{" "}
                    </Text>
                    <Text strong style={{ marginLeft: "10px" }}>
                      {tag}
                    </Text>
                  </Text>
                </span>
              </Space>
            {/* card footer end */}
          </Col>

          <Col span={7} style={{position:'relative'}}>
            {/* image start */}
            <div
              style={{
                maxHeight: "150px",
                maxWidth: "220px",
                height: "100%",
                width: "100%",
                marginRight: "0",
                marginLeft: "auto",
                position:'absolute',
                bottom:'10%',
              }}
            >
              <img alt="unable to upload"
                className="imghover"
                style={{ height: "100%", width: "100%" }}
                src={imageLink}
              />
            </div>
            {/* image end */}
          </Col>
        </Row>
    </>
  );
}
