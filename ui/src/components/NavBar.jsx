import { Menu, Dropdown, Button, Typography} from "antd";
import { useHistory } from "react-router-dom";
import BuzzAvatar from "./BuzzAvatar";
import { accessToken } from "../service/ServicePath";
import logo from "../assets/logo.png";

const { Text } = Typography;

export default function NavBar() {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem(accessToken());
  }

  const menu = (
    <Menu>
      <Menu.Item key={'profile'} onClick={(e) => history.push("/profile/you")}>
        Your Profile
      </Menu.Item>
      <Menu.Item key={'write'} onClick={(e) => history.push("/create")}>
        Write Your Story
      </Menu.Item>
      <Menu.Item key={'settings'} onClick={(e) => history.push("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item key={'logout'} onClick={(e) => logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Menu theme={'dark'} mode="horizontal" 
        style={{padding:'8px 40px 8px 40px',
        boxShadow: '0 4px 18px 0 rgb(0 0 0 / 10%)'
        }}>
        <Menu.Item
          key={1}
          style={{
            // fontSize: "30px",
            backgroundColor: "inherit",
          }}
          onClick={(e) => history.push("/home")}
        >
        <img src={logo} style={{height:'44px'}} alt="1minthoughts" />
          {/* <Text style={{color:'white'}}>1minthoughts</Text> */}
        </Menu.Item>
        <Menu.Item
          // className='ant-dropdown-link'
          key={2}
          style={{
            marginRight: "0%",
            marginLeft: "auto",
            padding: "0",
            backgroundColor: "inherit",
          }}
        >
        {/* <Switch defaultChecked onChange={onChange} style={{marginRight:'15px'}} /> */}
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Button
              style={{
                backgroundColor: "inherit",
                border:0,
                width: "40px",
                height: "40px",
                padding: "0",
                borderRadius: "50%",
              }}
            >
              <BuzzAvatar userId={'you'} />
            </Button>
        </Dropdown>
          
        </Menu.Item>
      </Menu>
    </>
  );
}
