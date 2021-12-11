import NavBar from "../../components/NavBar";
import { Row, Col} from "antd";
import { Typography, Space, Divider } from "antd";
import BuzzCard from "../../components/home/BuzzCard";
import RadialChart from "../../components/home/RadialChart.js";
import { useEffect, useState } from "react";
import api from "../../service/ServiceCall";
import BuzzPerformer from "../../components/home/BuzzPerformer";
import { LoginModal } from "../../components/LoginModal";
import ReactGA from 'react-ga';

const { Text } = Typography;

ReactGA.initialize('UA-214937125-1');
export default function Home(props) {
  const [graphData, setGraphData] = useState({ target: 10, read: 0 });
  const [displayData, setDisplayData] = useState([]);
  const [performer, setPerformer] = useState([]);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    // loading data for article meta
    api.getArticleCards().then((res) => {
      console.log(res);
      var arr = res.map((dt) => {
        
        return {
          authorname: dt.authorName, 
          authorLink: api.getProfileUrl(dt.authorId),
          authorId: dt.authorId,

          title: dt.title,
          summary: dt.summary,

          publishDate: dt.publishDate, 
          readTime: dt.readTime + " min",
          likes: dt.likes, 
          views: dt.views,
          tag: dt.tag ,

          link: api.getArticleUrl(dt.articleId),
          imageLink:  dt.thumbUrl,
        }
      })
      setDisplayData(arr)
    })
    .catch((err) => {})

    // loading data for performance graph
    api.getUserStats().then((res)=> {
      console.log(res);
      setGraphData({
        target: res.articleTargetRead, 
        read: res.articleRead,
        authored: res.articleAuthored,
      });
    })
    .catch((err) => { 
      if (err?.response?.status === 401){
        // removing token if get 401 (unauthorized) error
        api.resetToken();
        // setting token expired to be passed to login modal for displaying
        setTokenExpired(true);
      }
    })
    // load the top performing users
    api.getPerformers().then((res)=> {
      console.log(res);
      if (res!== undefined){
        setPerformer(res.map((data) => {
          return <BuzzPerformer {...data} />;
        }))
      }
    })
    .catch((err) => {})

  }, []);

  return (
    <>
      {/* <Layout> */}
      <NavBar />
      <Row 
      // style={{backgroundColor:'black'}}
      >
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
            {/* login modal */}
            {tokenExpired}
            <LoginModal tokenExpired={tokenExpired} />

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

            
            <Text type="secondary">Top Performers</Text>
            <Divider style={{ margin: "0", width: "70%", minWidth: "30%" }} />
            {performer}
            {/* connect social media start
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
            </Space> */}
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
