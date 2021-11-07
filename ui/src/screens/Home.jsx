import NavBar from "../components/NavBar";
import { Layout, Row, Col, Tabs } from "antd";
import { Typography, Space, Divider } from "antd";
import BuzzCard from "../components/home/BuzzCard";
import RadialChart from "../components/home/RadialChart.js";
import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { profileUrl, articleUrl, backendUrl } from "../components/common/Path.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { thumbUrl } from "../components/common/Miscellaneous";
import { authorId } from "../cache/UserData";

const { TabPane } = Tabs;
const { Text, Link } = Typography;
const { Footer } = Layout;

export default function Home() {
  const [graphData, setGraphData] = useState({ target: 10, read: 0 });
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    // loading data for article meta
    axios.get(backendUrl + "/articleMeta").then((res) => {
      console.log(res.data);
      setDisplayData( res.data.map((dt) => {
        return {
          authorname: dt.authorName,
          title: dt.title,
          summary: dt.summary,
          publishDate: dt.publishDate,
          readTime: dt.readTime + " min",
          fireCount: dt.likes,
          tag: dt.tag ,
          authorLink: profileUrl + dt.authorId,
          link: articleUrl + dt.articleId,
          imageLink: dt.imageLink
            ? backendUrl + "/uploads/" + dt.imageLink
            : thumbUrl(),
        };
      })
      )
    });
    // loading data for performance graph
    axios.get(backendUrl + "/UserStats/" + authorId()).then((res) => {
      console.log(res.data);
      setGraphData({
        target: res.data.articleTargetRead, 
        read: res.data.articleRead,
        authored: res.data.articleAuthored,
      });
    });

  }, []);

  return (
    <>
      {/* <Layout> */}
      <NavBar />
      <Row>
        <Col xs={0} sm={2} md={1} lg={4} xl={4}>
          <Space direction="vertical" id="profile-left-hide">
            {/* <Text>left</Text> */}
          </Space>
        </Col>
        {/* Feed/ Article starts */}
        <Col xs={24} sm={18} md={15} lg={14} xl={13}>
          <Space
            direction="vertical"
            size={8}
            style={{ width: "100%", paddingTop: "25px" }}
          >
            <Text type="secondary" style={{ padding: "25px" }}>
              Recommended For You
            </Text>
            <Divider
              style={{ margin: "0 0 0 20px", width: "180px", minWidth: "30%" }}
            />
            {displayData.map((dataObject) => {
              return <BuzzCard data={dataObject} />;
            })}
          </Space>
        </Col>
        {/* Feed/ Article ends */}

        <Col xs={0} sm={4} md={8} lg={6} xl={7}>
          <Space
            direction="vertical"
            id="profile-right-hide"
            style={{
              position: "sticky",
              top: "10px",
              padding: "25px",
            }}
          >
            {/* performance chart start */}
            <Text type="secondary">Your Performance</Text>
            <Divider style={{ margin: "0", width: "40%", minWidth: "30%" }} />
            <RadialChart {...graphData} />
            {/* performance chart end */}

            {/* connect social media start */}
            <Text type="secondary">Connect With Us</Text>
            <Divider style={{ margin: "0", width: "40%", minWidth: "30%" }} />

            <Space wrap={true}>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  borderRadius: "200px",
                  padding: "5px 10px",
                  display: "table",
                }}
              >
                <InstagramOutlined
                  style={{ fontSize: "24px", color: "#e040fb" }}
                />
                <Text
                  style={{
                    paddingLeft: "5px",
                    display: "table-cell",
                    verticalAlign: "middle",
                  }}
                >
                  Instagram
                </Text>
              </Link>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  borderRadius: "200px",
                  padding: "5px 10px",
                  display: "table",
                }}
              >
                <TwitterOutlined style={{ fontSize: "24px", color: "#08c" }} />
                <Text
                  style={{
                    paddingLeft: "5px",
                    display: "table-cell",
                    verticalAlign: "middle",
                  }}
                >
                  Twitter
                </Text>
              </Link>
            </Space>
            {/* connect social media end */}
            <br />
            {/*             
            <Footer>Copyright ©2021 Buzzpress Inc. All rights reserved.</Footer> */}
          </Space>
        </Col>
      </Row>
    </>
  );
}
