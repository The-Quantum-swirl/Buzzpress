import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import BuzzCard from '../components/home/BuzzCard';
import { Avatar, Col, Row, Space, Typography, Divider, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { profileUrl, backendUrl,articleUrl } from '../components/common/Path';
import { DateToMonthYearFormat, thumbUrl } from '../components/common/Miscellaneous';
const { Text, Link, Title } = Typography;

export default function Profile(){

  const {userId} = useParams();

  // personal Data 
  const [personalData, setPersonalData] = useState({
    name:'Derek Obrien',
    joinedDate:DateToMonthYearFormat('2020-06-14'),
    followers:3000
  });

  useEffect(() => {
    axios.get( backendUrl+'/user/'+userId )
    .then((res) => {
      console.log(res.data);
      var temp = res.data;
      setPersonalData({
        name:temp.userName,
        joinedDate:DateToMonthYearFormat(temp.dateOfBirth),
        followers:0
      })
    })

    axios.get(backendUrl + "/articleMetaByAuthor/" + userId).then((res) => {
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

  },[])    

  const [displayData, setDisplayData] = useState([]);
    
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
                <Text type="secondary">{"Followers "+ personalData.followers}</Text>
                <Title level={3} style={{fontWeight:'400', color:"#001529",
                 lineHeight:'0.7', marginTop:'0.5rem'}}>{personalData.name} </Title>
                <Text type="secondary" style={{fontWeight:'400'}}>{"Joined "+personalData.joinedDate} </Text>
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