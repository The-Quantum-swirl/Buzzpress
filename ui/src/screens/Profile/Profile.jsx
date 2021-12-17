import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import BuzzCard from '../../components/home/BuzzCard';
import { Col, Row, Space, Typography, Divider, Button, Empty } from 'antd';
import { DateToMonthYearFormat} from '../../components/Date';
import api from "../../service/ServiceCall";
import { ButtonGroup } from '@mui/material';
import BuzzAvatar from '../../components/BuzzAvatar';
import ReactGA from 'react-ga';

const { Text, Title } = Typography;

ReactGA.initialize('UA-214937125-1');

export default function Profile(){

  let {userId} = useParams();
  const [disable, setDisable] = useState(false);
  const [follow, setFollow] = useState(true);
  const [displayData, setDisplayData] = useState([]);
  // personal Data 
  const [personalData, setPersonalData] = useState({
    name:'Anonymous',
    joinedDate:DateToMonthYearFormat('2021-12-08'),
    followers:0,
    following:0,
    profilePicture:false,
  });

  useEffect(() => {
    
    ReactGA.pageview(window.location.pathname + window.location.search);
    console.log(userId);
    userId==='you'? 
    ( setDisable(true) ) : (
    api.sameUser(userId)
    .then((res) => {
      // console.log(res);
      setDisable(res.data)
    })
    .catch((err) => { console.log(err.response.status);})
    )

    userId === 'you' ? (
    api.getSelf().then((res) => {
      console.log(res)
      setPersonalData({
        name:res.name,
        joinedDate:res.userJoinDate!==null ? DateToMonthYearFormat(res.userJoinDate) : "10 Dec,2021",
        followers: res.followers!==null ? res.followers.length: 0,
        following: res.following!==null ? res.following.length: 0,
        profilePicture: res.imageUrl!==null ? res.imageUrl: false,
      })
    })
    .catch((res) => {})
    ):(
    api.getUser(userId)
    .then((res) => {
      console.log(res)
      setPersonalData({
        name:res.name,
        joinedDate:res.userJoinDate!==null ? DateToMonthYearFormat(res.userJoinDate) : "1 Jan,1999",
        followers: res.followers!==null ? res.followers.length: 0,
        following: res.following!==null ? res.following.length: 0,
        profilePicture: res.imageUrl!==null ? res.imageUrl: false,
      });

      setFollow(! res?.followers?.includes( JSON.parse(localStorage.getItem('you'))?.userId) )
    })
    .catch((err) => {})
    )

    api.getArticleCardsByAuthorId((userId==='you'? undefined: userId)).then((res) => {
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
          tag: dt.tag ,
          views: dt.views,
          link: api.getArticleUrl(dt.articleId),
          imageLink: dt.thumbUrl,
        }
      })
      setDisplayData(arr)
    })
    .catch((err) => { })

  },[userId])    
  const handleFollow = (e) => {
    console.log("followed")
    console.log(userId)
    setFollow(false);
    api.postFollow(userId);
  }
  const handleUnFollow = (e) => {
    console.log("Unfollowed")
    console.log(userId)
    setFollow(true);
    api.postUnFollow(userId);
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
              <BuzzAvatar type="large" userId={userId} />
              {/* profile picture end */}

              <div style={{display:'flex', flexDirection:'column',
              marginRight:'4%', marginLeft:'auto',
              marginBottom:'2px', marginTop:'auto'
              }}>
                {/* user info name, joined, followers count */}
                <Text type="secondary" style={{textAlign:'center'}}>
                  {"Followers "+ personalData.followers + " Following "+ personalData.following}
                </Text>
                <Title level={3} style={{fontWeight:'400', color:"#001529", textAlign:'center',
                 lineHeight:'0.7', marginTop:'0.5rem'}}>
                  {personalData.name.split(' ')[0]}
                </Title>
                <Text type="secondary" style={{fontWeight:'400', textAlign:'center'}}>
                  {"Joined "+personalData.joinedDate}
                </Text>
                
                  <ButtonGroup>
                  <Button size="middle" disabled={disable} type={follow?'primary':'default'} onClick={(e) => handleFollow(e)}>
                    {follow? 'Follow': 'Following'}
                  </Button>
                  <Button size="middle" disabled={disable} type="default" onClick={(e) => handleUnFollow(e)}>UnFollow</Button>
                  </ButtonGroup>
                
                {/* user info end */}
              </div>
            </div>

          <Space direction="vertical" size={8} style={{width:'100%'}}>
            <Text type="secondary" style={{padding:'20px'}}>Your Timeline</Text>
            <Divider style={{ margin: "0 0 0 15px", width: "90%", minWidth:'90%'}} />
            {displayData.length === 0? <Empty />: 
              displayData.map((dataObject) => { return <BuzzCard data={dataObject} />;})
            }
            
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