import { Row, Col } from 'antd';
import { Typography} from 'antd';
import Topics from './Topics';
const { Text, Title } = Typography;

const sqlDateToMonthYearFormat = (sqlDate) =>{
    let dateArr = sqlDate.split('-');
    let articleDate = new Date(dateArr[0], ( Number(dateArr[1])-1 ).toString(), dateArr[2].substr(0,2) );
    let convertedDate = articleDate.toDateString();
    dateArr = convertedDate.split(" ");
    return dateArr[1]+" "+Number(dateArr[2]).toString() +", "+ dateArr[3];
}
export default function BuzzCard(props){
    if (props=== undefined || props.data ===undefined){
        console.log("empty");
        return (<> </>);
    } 
    const authorname = props.data.authorname;
    const heading =  props.data.heading;
    const subHeading = props.data.subHeading;
    const publishDate = sqlDateToMonthYearFormat(props.data.publishDate);
    const readTime = props.data.readTime;
    const authorLink = props.data.authorLink;
    const articleLink =props.data.link;
    const imageLink = props.data.imageLink;  
    
    return (
    <>  
        <div style={{ width:'100%',height:'150px', marginTop:'30px',
        // border:'1px solid rgba(0, 0, 0, 0.06)',
        }}>
        <Row>
            <Col span={16} style={{padding:'5px'}}>
            {/* author name start*/}
            <a href={authorLink} target='_blank'>
            <div style={{height:'26px',overflow:'hidden'}}>
            <Title level={5} ellipsis={true}>{authorname}</Title>
            </div>
            </a>
            {/* author name end */}

            {/* heading start */}
            <a href={articleLink} target="_blank">
            <div style={{height:'68px',overflow:'hidden'}}>
            <Title level={3} style={{marginTop:'0', fontWeight:'700',}} ellipsis={{rows:2}}>{heading}</Title>
            </div>
            {/* heading end */}

            {/* subheading start (small intro) */}
            <Text ellipsis={true} >{subHeading}</Text>
            </a>
            {/* subheading end */}

            {/* card footer start */}
            <div style={{height:'20px',overflow:'hidden', position:'absolute', bottom:'3%'}}>
            <Text ellipsis={true} >{publishDate} {readTime} read </Text> <Topics data="code" />
            </div>
            {/* card footer end */}
            </Col>

            <Col span={8}>
            {/* image start */}
            <div style={{ height:'150px', width:'220px',
            marginRight:'0', marginLeft:'auto', 
            }}>
            <img style={{height:'100%', width:'100%'}} 
            src={imageLink} />
            </div>
            {/* image end */}
             </Col>
        </Row>
            
        </div>
        {/* </Card> */}
    </>
    );
}