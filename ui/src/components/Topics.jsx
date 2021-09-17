import { Typography} from 'antd';
const { Text } = Typography;

export default function Topics(props){
    const tag = props.data || '';


    return (
    <span style={{backgroundColor:'rgba(0, 0, 0, 0.06)',
        borderRadius:'100px', padding:'0px 12px 0px 12px',}}>
        <Text strong style={{
        textAlign:'center', 
        display:'inline-flex',
        }}>
        {tag}</Text>

    </span>
    );
}