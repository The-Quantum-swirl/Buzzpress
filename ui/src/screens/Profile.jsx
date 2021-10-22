import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import BuzzCard from '../components/home/BuzzCard';
import { Avatar, Col, Row, Space, Typography, Divider, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Link, Title } = Typography;
export default function Profile(){
  const {userId} = useParams();
  const name = 'Derek Obrien';
  const joinedDate = 'Jun 14, 2020';

  const displayData = [
    {
      authorname: "Bhargav Bachina",
      heading: "React — How To Proxy To Backend Server",
      subHeading: "Explaining how to configure a proxy for backend API calls with an example.",
      publishDate: "2020-06-14 10:29:08",
      readTime: "6 min",
      fireCount: 15,
      tag: "React",
      authorLink: "", // {localhost:3000}/profile/{userId}
      link: "", // {localhost:3000}/article/{articleId}
      imageLink: "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK", // first image file object
    },
    {
      authorname: "Sean Kernan",
      heading: "You Aren’t Lazy. You Are Overstimulated.",
      subHeading: "Slowing your life down is the secret to getting things done.",
      publishDate: "2021-06-02 10:29:08",
      readTime: "5 min",
      fireCount: 5336,
      tag: "Life",
      authorLink: "",
      link: "",
      imageLink: "https://miro.medium.com/fit/c/300/201/1*__4RC4kaUgXdNFbFTzatcQ.jpeg",
    },
    {
      authorname: "Nivedha Duraisamy",
      heading: "4 Ways to Add External JavaScript Files in React",
      subHeading: "React Hooks and other methods",
      publishDate: "2020-04-06 10:29:08",
      readTime: "5 min",
      fireCount: 23,
      tag: "React",
      authorLink: "",
      link: "",
      imageLink: "https://miro.medium.com/fit/c/300/201/1*iLt_otrbPJceYlzyIQcjJg.jpeg",
    },
  ];
    
    return(
        <>
        <NavBar />
        
        <Row>
            <Col span={23} style={{ maxWidth: "800px", padding: "2% 2% 2% 6%" }}>
            <Space align="center" style={{width:'100%', padding:'22px'}}>
                <Avatar
                style={{
                width: "150px",
                height: "150px",
                backgroundColor: "red",
                }}
                icon={<UserOutlined style={{fontSize:'90px', padding:'30px'}}/>}
                />
                <PageHeader
                title={name}
                subTitle={"Joined "+joinedDate}
                />
            </Space>

            <Space direction="vertical" style={{width:'100%'}}>
              <Text type="secondary">Recommended For you</Text>
              <Divider style={{ margin: "0", width: "22%", minWidth: "5%" }} />
              {displayData.map((dataObject) => {
              return <BuzzCard data={dataObject} />;
              })}
            </Space>
            </Col>

        </Row>
            
        </>
    );
}