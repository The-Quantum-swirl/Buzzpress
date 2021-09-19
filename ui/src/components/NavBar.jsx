import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Dropdown, Button } from 'antd';
import { Typography} from 'antd';
import { useHistory } from "react-router-dom";
import Logout from './logout';
const { Header} = Layout;
const { Text } = Typography;

export default function NavBar() {
  let history = useHistory();
  const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" onClick={(e) => history.push('/create')}>
        Write something
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" onClick={(e) => history.push('/settings')}>
        Settings
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" onClick={(e) => <Logout />}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
  );
    return (
    <div >
      <Header style={{boxShadow: '0 4px 18px 0 rgb(0 0 0 / 10%)',
      }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
        <Menu.Item key={1} style={{fontSize:'25px', color:'white'}}>BuzzPress</Menu.Item>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Button style={{
          backgroundColor:'inherit',
          width:'40px',height:'40px',
          border: '2px solid white',
          padding:'0', borderRadius:'50%',
          marginRight:'3%', marginLeft: 'auto',
          marginTop: '1%',
        }}>
          <Avatar  style={{ width:'36px',height:'36px',backgroundColor: '#87d068', }} icon={<UserOutlined />} />
        </Button>
        </Dropdown>
        
      </Menu>
    </Header>
    </div>
  );
}
        
        