import NavBar from "../components/NavBar";
import { Layout, Row, Col } from 'antd';
import { Typography, Space, Divider } from 'antd';
import BuzzCard from "../components/BuzzCard";
import Topics from "../components/Topics";
import RadialChart from "../components/RadialChart.js";
const { Text } = Typography;
const { Footer} = Layout;



export default function Home(){
    const suggestedTopics=['AI','BlockChain','React','SpringBoot','Ethereum','Nano'];
    const displayData=[
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        {
            authorname : "Sam Mikaelson",
            heading : "Five After Hours Habits to Help You Build a Tiny Empire, Quietly",
            subHeading : "Build from your bedroom",
            publishDate: '2015-04-29 10:29:08',
            readTime : '5 min',
            authorLink : '',
            link : '',
            imageLink : "https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz"
        },
        
    ]
    return (
        <>
        {/* <Layout> */}
        <NavBar / >

        <Row >
        <Col span={15} style={{padding:'30px',}}>
            
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
        <Col span={8} style={{
            paddingTop:'30px',
        }}>

            <Space direction="vertical" >
            <RadialChart />
            {/* <div id="chart"></div> */}

            {/* connect social media start */}
            <Text type="secondary">Connect Your</Text>
            <Divider style={{margin:'0', width:'40%', minWidth:'30%'}} />
            
            <Space wrap={true} style={{width:'50%'}}>
            Instagram, Twitter, Youtube
            </Space>
            {/* connect social media end */}
            <br />
            
            
            
            {/* Topic suggestion start */}
            <Text type="secondary">Topics you might like</Text>
            <Divider style={{margin:'0', width:'50%', minWidth:'30%'}} />
            
            <Space wrap={true} style={{width:'50%'}}>
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