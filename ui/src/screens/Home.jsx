import NavBar from "../components/NavBar";
import { Layout, Row, Col } from 'antd';
import { Typography, Space, Divider } from 'antd';
import BuzzCard from "../components/BuzzCard";
const { Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;



export default function Home(){

    return (
        <>
        {/* <Layout> */}
        <NavBar / >

        <Row >
        <Col span={15} style={{
            padding:'30px',
        }}>
            
            <Text type="secondary">For you</Text>
            <Divider style={{margin:'0'}} />

            <BuzzCard />
            <BuzzCard />
        
        </Col>

        <Col span={1}>
            <Divider  type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={8} style={{
            paddingTop:'30px',
        }}>

            <Space direction="vertical">
            
            <Text type="secondary">Connect Your</Text>
            <Divider style={{margin:'0'}} />
            Instagram, Twitter, Youtube
            <br />

            <Text type="secondary">Topics you might like</Text>
            <Divider style={{margin:'0'}} />
            AI, BockChain, React
            <br />
            </Space>
            
            
        </Col>
        </Row>
        <br />
            
        <Footer>Footer</Footer>


        </>

    );
}