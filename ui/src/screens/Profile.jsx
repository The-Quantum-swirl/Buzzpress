import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import BuzzCard from '../components/home/BuzzCard';
import { Avatar, Col, Row, Space, Typography, Divider, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { profileUrl, backendUrl,articleUrl } from '../components/common/Path';
import { DateToMonthYearFormat, thumbUrl } from '../components/common/Miscellaneous';
import api from "../service/ServiceCall";
import { authorId } from '../cache/UserData';
import { ButtonGroup } from '@mui/material';
const { Text, Link, Title } = Typography;

export default function Profile(){

  let {userId} = useParams();
  userId = parseInt(userId)
  
  const [displayData, setDisplayData] = useState([]);
  // personal Data 
  const [personalData, setPersonalData] = useState({
    name:'Derek Obrien',
    joinedDate:DateToMonthYearFormat('2020-06-14'),
    followers:3000
  });

  useEffect(() => {

    api.getUser(userId).then((res) => {
      console.log(res)
      setPersonalData({
        name:res.userName,
        joinedDate:DateToMonthYearFormat(res.dateOfBirth),
        followers: res.followers.length|| 0,
        following:res.following.length|| 0,
      })
    })

    api.getArticleCardsByAuthorId(userId).then((res) => {
      console.log(res);
      var arr = res.map((dt) => {
        return {
          authorname: dt.authorName, authorLink: profileUrl + dt.authorId,

          title: dt.title, summary: dt.summary,

          publishDate: dt.publishDate, readTime: dt.readTime + " min",
          fireCount: dt.likes, tag: dt.tag ,

          link: articleUrl + dt.articleId,
          imageLink: api.getThumbUrl(dt.thumbUrl),
        }
      })
      setDisplayData(arr)
      console.log(displayData)
    })

  },[])    
  const handleFollow = (e) => {
    console.log("followed")
    // if (authorId() !== userId){
      console.log(authorId(),userId)
      api.postFollow(authorId(),userId);
    // }
  }
  const handleUnFollow = (e) => {
    console.log("Unfollowed")
    // if (authorId() !== userId){
      console.log(authorId(),userId)
      api.postUnFollow(authorId(),userId);
    // }
  }
    return(
        <>
        <NavBar />
        
        <Row style={{ marginTop: "2%" }}>
          <Col xs={0} sm={2} md={1} lg={4} xl={4}>
            <Space direction="vertical" id="profile-left-hide">
              {/* <Text>left</Text> */}

            </Space>
          </Col>
          <Col xs={24} sm={18} md={15} lg={14} xl={13}>
            <div style={{padding:'3%' , display:'flex', flexDirection:'row'}}>
              {/* profile picture */}
              <Avatar
              style={{
              width: "150px",
              height: "150px",
              backgroundColor: "#ADD8E6",
              }}
              icon={<UserOutlined style={{fontSize:'90px', padding:'30px'}}/>}
              />
              {/* profile picture end */}
              <div style={{display:'flex', flexDirection:'column',
              marginRight:'8%', marginLeft:'auto',
              marginBottom:'2px', marginTop:'auto'
              }}>
                {/* user info name, joined, followers count */}
                <Text type="secondary">{"Followers "+ personalData.followers + " Following "+ personalData.following}</Text>
                <Title level={3} style={{fontWeight:'400', color:"#001529",
                 lineHeight:'0.7', marginTop:'0.5rem'}}>{personalData.name} </Title>
                <Text type="secondary" style={{fontWeight:'400'}}>{"Joined "+personalData.joinedDate} </Text>
                <ButtonGroup>
                <Button size="middle" type="primary" onClick={(e) => handleFollow(e)}>Follow</Button>
                <Button size="middle" type="default" onClick={(e) => handleUnFollow(e)}>UnFollow</Button>
                </ButtonGroup>
                {/* user info end */}
              </div>
            </div>

          <Space direction="vertical" size={8} style={{width:'100%'}}>
            <Text type="secondary" style={{padding:'20px'}}>Your Timeline</Text>
            <Divider style={{ margin: "0 0 0 15px", width: "90%", minWidth:'90%'}} />
            {displayData.map((dataObject) => {
            return <BuzzCard data={dataObject} />;
            })}
          </Space>
          </Col>
          <Col xs={0} sm={4} md={8} lg={6} xl={7}>
            <Space direction="vertical" id="profile-right-hide">
              {/* <Text>right</Text> */}

            </Space>
          </Col>

        </Row>
            
        </>
    );
}