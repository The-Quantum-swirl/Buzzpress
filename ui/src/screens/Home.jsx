import NavBar from "../components/NavBar";
import { Layout, Row, Col, Tabs } from "antd";
import { Typography, Space, Divider } from "antd";
import BuzzCard from "../components/home/BuzzCard";
import Topics from "../components/home/Topics";
import RadialChart from "../components/home/RadialChart.js";
import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import {profileUrl, articleUrl, backendUrl} from './common/Path.js';
import { getImageFromContent } from "./common/Miscellaneous";
import { useEffect, useState } from "react";
import axios from 'axios';

const { TabPane } = Tabs;
const { Text, Link } = Typography;
const { Footer } = Layout;

export default function Home() {
  const authorId = 123;
  const suggestedTopics = [
    "AI",
    "BlockChain",
    "React",
    "SpringBoot",
    "Ethereum",
    "Nano",
  ];
  useEffect(() => {
    axios.get( backendUrl+'/article' )
    .then((res) => {
      console.log(res.data);
      var arr = res.data.map((data) => {
        var dt = data;        
        return(
          {
            authorname: "Bhargav Bachina",
            title:dt.title,
            summary:dt.summary,
            publishDate: dt.publishDate || "2020-06-14",
            readTime: dt.readTime + " min",
            fireCount: 15,
            tag: dt.tag || "React",
            authorLink: profileUrl+dt.authorId,
            link:  articleUrl+dt.articleId,
            imageLink: (dt.imageLink? backendUrl+"/uploads/"+dt.imageLink : "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK"),
          }
        );
      })
    setDisplayData(arr);
    })
  },[])
  const [displayData, setDisplayData] =  useState([
    {
      authorname: "Bhargav Bachina",
      title: "React — How To Proxy To Backend Server",
      summary: "Explaining how to configure a proxy for backend API calls with an example.",
      publishDate: "2020-06-14",
      readTime: "6 min",
      fireCount: 15,
      tag: "React",
      authorLink: profileUrl+authorId, // {localhost:3000}/profile/{userId}
      link: articleUrl+12, // {localhost:3000}/article/{articleId}
      imageLink: "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK", // first image file object
    },
    {
      authorname: "Sean Kernan",
      title: "You Aren’t Lazy. You Are Overstimulated.",
      summary: "Slowing your life down is the secret to getting things done.",
      publishDate: "2021-06-02",
      readTime: "5 min",
      fireCount: 5336,
      tag: "Life",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/1*__4RC4kaUgXdNFbFTzatcQ.jpeg",
    },
    {
      authorname: "Nivedha Duraisamy",
      title: "4 Ways to Add External JavaScript Files in React",
      summary: "React Hooks and other methods",
      publishDate: "2020-04-06",
      readTime: "5 min",
      fireCount: 23,
      tag: "React",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/1*iLt_otrbPJceYlzyIQcjJg.jpeg",
    },
    {
      authorname: "Sam Mikaelson",
      title: "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
      summary: "Build from your bedroom",
      publishDate: "2015-04-29",
      readTime: "5 min",
      fireCount: 55,
      tag: "Science",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz",
    },
    {
      authorname: "Harsha Vardhan",
      title: "useAxios: A React Hook for using Axios",
      summary: "How to Create a Custom Hook for using Axios",
      publishDate: "2021-06-05",
      readTime: "3 min",
      fireCount: 189,
      tag: "JavaScript",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/0*VdoVFyMENPePCXbT.png",
    },
    {
      authorname: "Sam Mikaelson",
      title: "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
      summary: "Build from your bedroom",
      publishDate: "2015-04-29",
      readTime: "5 min",
      fireCount: 38,
      tag: "Science",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz",
    },
    {
      authorname: "Abhijit Roy",
      title: "Build JS, and MongoDB",
      summary: "Currently, most of the websites operate on an API-based backend structure, where we just send a request from the front end of the website",
      publishDate: "2021-04-08",
      readTime: "11 min",
      fireCount: 542,
      tag: "JavaScript",
      authorLink: profileUrl+authorId,
      link: articleUrl+12,
      imageLink: "https://miro.medium.com/fit/c/300/201/1*RG2GDRY3uUbNYvESrHw9qA.jpeg",
    },
  ]);

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
          <Space direction="vertical" size={8} style={{width:'100%', paddingTop:'25px'}}>
            <Text type="secondary" style={{padding:'25px'}}>Recommended For You</Text>
            <Divider style={{ margin: "0 0 0 20px",width: "180px", minWidth: "30%"}} />
            {displayData.map((dataObject) => {
            return <BuzzCard data={dataObject} />;
            })}
          </Space>
        </Col>
        {/* Feed/ Article ends */}
        
        <Col xs={0} sm={4} md={8} lg={6} xl={7}>
          <Space direction="vertical" id="profile-right-hide" 
            style={{ 
              position: "sticky", top: "10px",
              padding:'25px'
            }}>
            {/* performance chart start */}
            <Text type="secondary">Your Performance</Text>
            <Divider style={{ margin: "0", width: "40%", minWidth: "30%" }} />
            <RadialChart />
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

            {/* Topic suggestion start */}
            <Text type="secondary">Topics you might like</Text>
            <Divider style={{ margin: "0", width: "50%", minWidth: "30%" }} />

            <Space wrap={true} style={{ width: "80%" }}>
              {suggestedTopics.map((topic) => (
                <Topics data={topic} />
              ))}
            </Space>
            {/* Topic suggestion end */}

            <br />
          </Space>
        </Col>
      </Row>

      <br />

      <Footer>Copyright ©2021 Buzzpress Inc. All rights reserved.</Footer>
    </>
  );
}
