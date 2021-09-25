import { Typography} from 'antd';
const { Text } = Typography;

export default function Topics(props){
    const tag = props.data || '';


    return (
    <span style={{backgroundColor:'rgba(0, 0, 0, 0.08)', borderRadius:'200px',
     padding:'4px 12px', display:'table',}}>
        <Text style={{
        display:'table-cell', verticalAlign:'middle'
        }}>
        {tag}</Text>

    </span>
    );
}