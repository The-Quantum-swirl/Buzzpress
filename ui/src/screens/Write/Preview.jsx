import Topics from "../../components/home/Topics";
import { Row, Col, Typography } from "antd";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

export default function Preview(props) {
  if (
    props.data === undefined ||
    props.data.head === undefined ||
    props.data.subHead === undefined ||
    props.data.paragraph === undefined
  ) {
    return <> Err occured in Preview !!! </>;
  }

  const DateToMonthYearFormat = (date) => {
    let todaysDate = date.toDateString();
    let dateArr = todaysDate.split(" ");
    return dateArr[1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[3];
  };

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  }

  const authorName = "Derick David";
  const publishDate = DateToMonthYearFormat(new Date());
  const readTime = props.data.readTime;
  const tag = props.data.tag;
  const authorLink = props.data.authorLink;

  const heading = props.data.head || "Empty Title";
  const subHeading = props.data.subHead || "Empty Recap";
  const para = props.data.paragraph;

  return (
    <>
      <Row justify="center" style={{ marginTop: "5%" }}>
        <Col className="desktop mobile">
            
        <a href={authorLink} target="_blank" rel="noreferrer">
          <div style={{ display: "table" }}>
            <Avatar
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "blue",
                display: "table-cell",
              }}
              icon={<UserOutlined />}
            />
            <span
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                borderRadius: "20px 200px 200px 20px",
                padding: "2px 12px 2px",
                display: "table-cell",
                verticalAlign:'middle',
              }}
            >
              <Text style={{ display: "table-cell", verticalAlign: "middle" }}>
                <Text strong>{authorName}</Text>
                <Text style={{ marginLeft: "10px" }}>{publishDate}</Text>
                <Text style={{ marginLeft: "10px" }}>
                  {readTime + " read"}
                </Text>
              </Text>
            </span>
            
          </div>
        </a>

          <Title
            level={1} ellipsis={{ rows: 2 }}
            style={{ marginTop: "15px", marginBottom: "5px", fontWeight: "700", textAlign:'center' }}
          >
            {heading}
          </Title>
          <Title level={3} ellipsis={{ rows: 2 }} style={{ textAlign:'center'}}>
            {subHeading}
          </Title>

          {para.map((point) => {
            return checkURL(point) ? (
              <img
                src={point}
                alt="unable to load"
                style={{ width: "100%", height: "auto", marginBottom:'15px' }}
              />
            ) : (
              <Title level={5}>{point}</Title>
            );
          })}

          <Space wrap={true} style={{margin:'5%'}}>
            {tag.map((topic) => <Topics data={topic} />)}
            </Space>
        </Col>
      </Row>
    </>
  );
}
