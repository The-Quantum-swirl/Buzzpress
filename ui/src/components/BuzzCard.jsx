import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Text, Title } = Typography;
const { Meta } = Card;

export default function BuzzCard(){

    return (
    <>
        <div style={{ width:'100%', marginTop:'30px',borderRadius:'6px', }}>
        <Row>
            <Col span={16}>
            <Title level={4}>Sam Mikaelson</Title>
            <Title level={3}>Five After Hours Habits to Help You Build a Tiny Empire, Quietly</Title>
            <Text>Build from your bedroom</Text>
             
            </Col>
            <Col span={8}>
            <div style={{ height:'150px', width:'220px', borderRadius:'2px', }}
            >
                
            <img style={{height:'100%', width:'100%'}} 
            src="https://miro.medium.com/fit/c/300/201/0*9msmJSwtcwm_NxFz" />
            
            </div>
             </Col>
        </Row>
            
        </div>
        {/* </Card> */}
    </>
    );
}