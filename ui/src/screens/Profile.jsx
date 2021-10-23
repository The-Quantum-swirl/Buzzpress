import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import BuzzCard from '../components/home/BuzzCard';
import { Avatar, Col, Row, Space, Typography, Divider, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { profileUrl } from './common/Path';

const { Text, Link, Title } = Typography;
export default function Profile(){
  const {userId} = useParams();
  const name = 'Derek Obrien';
  const joinedDate = 'Jun 14, 2020';

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
      link: "", // {localhost:3000}/article/{articleId}
      imageLink: "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK", // first image file object
    },
  ];
    
    return(
        <>
        <NavBar />
        
        <Row style={{ marginTop: "2%" }}>
          <Col xs={0} sm={2} md={1} lg={4} xl={4}>
          
          </Col>
            <Col xs={24} sm={18} md={15} lg={14} xl={13}>
            {/* <Space size={34} align="baseline" style={{width: '100%',padding:'20px'}}> */}
              <div style={{padding:'2%' , display:'flex', flexDirection:'row'}}>
                <Avatar
                style={{
                width: "150px",
                height: "150px",
                backgroundColor: "red",
                }}
                icon={<UserOutlined style={{fontSize:'90px', padding:'30px'}}/>}
                />
                <div style={{display:'flex', flexDirection:'column',
                marginRight:'8%', marginLeft:'auto',
                marginBottom:'15px', marginTop:'auto'
                }}>
                <Title level={3} style={{fontWeight:'700'}}>{name} </Title>
                <Text style={{fontWeight:'400'}}>{"Joined "+joinedDate} </Text>
                </div>
              </div>
                {/* <PageHeader
                title={name}
                summary={"Joined "+joinedDate}
                /> */}
            {/* </Space> */}

            <Space direction="vertical" size={8} style={{width:'100%'}}>
              <Text type="secondary" style={{padding:'10px'}}>Your Timeline</Text>
              <Divider style={{ margin: "0 0 0 10px", width: "100px", minWidth: "5%" }} />
              {displayData.map((dataObject) => {
              return <BuzzCard data={dataObject} />;
              })}
            </Space>
            </Col>
          <Col xs={0} sm={4} md={8} lg={6} xl={7}>
            
          </Col>

        </Row>
            
        </>
    );
}