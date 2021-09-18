import NavBar from "../components/NavBar";
import { Layout, Row, Col } from 'antd';
import { Typography, Space, Divider } from 'antd';
import BuzzCard from "../components/BuzzCard";
import Topics from "../components/Topics";
import RadialChart from "../components/RadialChart.js";
import { InstagramOutlined, TwitterCircleFilled } from "@ant-design/icons";
const { Text, Link } = Typography;
const { Footer} = Layout;



export default function Home(){
    const suggestedTopics=['AI','BlockChain','React','SpringBoot','Ethereum','Nano'];
    const displayData=[
        {
            authorname : "Bhargav Bachina",
            heading : "React — How To Proxy To Backend Server",
            subHeading : "Explaining how to configure a proxy for backend API calls with an example.",
            publishDate: '2020-06-14 10:29:08',
            readTime : '6 min',
            tag:'React',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK"
        },
        {
            authorname : "Sean Kernan",
            heading : "You Aren’t Lazy. You Are Overstimulated.",
            subHeading : "Slowing your life down is the secret to getting things done.",
            publishDate: '2021-06-02 10:29:08',
            readTime : '5 min',
            tag:'Life',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/1*__4RC4kaUgXdNFbFTzatcQ.jpeg"
        },
        {
            authorname : "Nivedha Duraisamy",
            heading : "4 Ways to Add External JavaScript Files in React",
            subHeading : "React Hooks and other methods",
            publishDate: '2020-04-06 10:29:08',
            readTime : '5 min',
            tag:'React',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/1*iLt_otrbPJceYlzyIQcjJg.jpeg"
        },
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            tag:'Science',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        {
            authorname : "Harsha Vardhan",
            heading : "useAxios: A React Hook for using Axios",
            subHeading : "How to Create a Custom Hook for using Axios",
            publishDate: '2021-06-05 10:29:08',
            readTime : '3 min',
            tag:'JavaScript',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*VdoVFyMENPePCXbT.png"
        },
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            tag:'Science',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        {
            authorname : "Abhijit Roy",
            heading : "Buil JS, and MongoDB",
            subHeading : "Currently, most of the websites operate on an API-based backend structure, where we just send a request from the front end of the website",
            publishDate: '2021-04-08 10:29:08',
            readTime : '11 min',
            tag:'JavaScript',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/1*RG2GDRY3uUbNYvESrHw9qA.jpeg"
        },
    ]
    return (
        <>
        {/* <Layout> */}
        <NavBar / >

        <Row >
        <Col span={16} style={{padding:'2% 2% 2% 6%',}}>
            
            <Space direction="vertical" > 
            
            <Text type="secondary">Recommended For you</Text>
            <Divider style={{margin:'0', width:'22%', minWidth:'5%'}} />
            {
                displayData.map((dataObject) => {
                    console.log(dataObject);
                    return <BuzzCard data={dataObject} />;
                })
            }
            
            </Space>
        
        </Col>

        <Col span={1}>
            <Divider  type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={7} style={{
            paddingTop:'30px',
        }}>

            <Space direction="vertical" style={{position:'sticky', top: '5%',}}>
            {/* performance chart start */}
            <RadialChart />
            {/* performance chart end */}

            {/* connect social media start */}
            <Text type="secondary">Connect Your</Text>
            <Divider style={{margin:'0', width:'40%', minWidth:'30%'}} />
            
            <Space wrap={true} style={{width:'50%'}}>
            <Link href="https://www.instagram.com" target="_blank">
                <InstagramOutlined style={{ fontSize: '30px', color: '#d500f9' }}  />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
                <TwitterCircleFilled style={{ fontSize: '30px', color: '#08c' }}  />
            </Link>
            </Space>
            {/* connect social media end */}
            <br />
            
            {/* Topic suggestion start */}
            <Text type="secondary">Topics you might like</Text>
            <Divider style={{margin:'0', width:'50%', minWidth:'30%'}} />
            
            <Space wrap={true} style={{width:'80%'}}>
            {suggestedTopics.map((topic) => <Topics data={topic} />)}
            </Space>
            {/* Topic suggestion end */}
            

            <br />
            </Space>
            
            
        </Col>
        </Row>
        <br />
            
        <Footer>Footer</Footer>


        </>

    );
}