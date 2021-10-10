import { Typography} from 'antd';
const { Text, Title } = Typography;

export default function Topics(props){
    const tag = props.data || '';


    return (
    <span style={{backgroundColor:'rgba(0, 0, 0, 0.08)', borderRadius:'200px',
     padding:'4px 12px', display:'table',}}>
        <Title level={5} style={{
        display:'table-cell', verticalAlign:'middle', fontWeight:'400'
        }}>
        {tag}</Title>

    </span>
    );
}