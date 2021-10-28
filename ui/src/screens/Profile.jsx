import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import BuzzCard from '../components/home/BuzzCard';
import { Avatar, Col, Row, Space, Typography, Divider, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { profileUrl, articleUrl } from './common/Path';

const { Text, Link, Title } = Typography;
export default function Profile(){
  const {userId} = useParams();
  const name = 'Derek Obrien';
  const joinedDate = 'Jun 14, 2020';
  const followers = 3000;

  const displayData = [
    {
      authorname: "Bhargav Bachina",
      title: "React — How To Proxy To Backend Server",
      summary: "Explaining how to configure a proxy for backend API calls with an example.",
      publishDate: "2020-06-14 10:29:08",
      readTime: "6 min",
      fireCount: 5000,
      tag: "React",
      authorLink: profileUrl+userId, // {localhost:3000}/profile/{userId}
      link: articleUrl+12, // {localhost:3000}/article/{articleId}
      imageLink: "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK", // first image file object
    },
  ];
    
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
                <Text type="secondary">{"Followers "+followers}</Text>
                <Title level={3} style={{fontWeight:'400', color:"#001529",
                 lineHeight:'0.7', marginTop:'0.5rem'}}>{name} </Title>
                <Text type="secondary" style={{fontWeight:'400'}}>{"Joined "+joinedDate} </Text>
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