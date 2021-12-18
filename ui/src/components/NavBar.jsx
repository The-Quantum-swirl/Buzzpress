import { Menu, Dropdown, Button} from "antd";
import { useHistory } from "react-router-dom";
import BuzzAvatar from "./BuzzAvatar";
import { accessToken } from "../service/ServicePath";
import httpService from "../service/Httpservice";
import logo from "../assets/logo.png";

export default function NavBar() {
  let history = useHistory();

  const logout = () => {
    // removing acess token
    localStorage.removeItem(accessToken());
    // removing cashed use details
    localStorage.removeItem('you');
    localStorage.clear();
    httpService.deleteJwt();
    window.location.reload();
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
        style={{
        padding:'6px',
        boxShadow: '0 4px 18px 0 rgb(0 0 0 / 10%)'
        }}>
        <Menu.Item
          key={1}
          style={{
            // fontSize: "30px",
            paddingLeft:'5%' ,
            backgroundColor: "inherit",
          }}
          onClick={(e) => history.push("/home")}
        >
        <img src={logo} style={{height:'44px'}} alt="1minthoughts" />
        </Menu.Item>
        <Menu.Item
          // className='ant-dropdown-link'
          key={2}
          style={{
            marginRight: "4%",
            marginLeft: "auto",
            padding: "0",
            backgroundColor: "inherit",
          }}
        >
        {/* <Switch defaultChecked onChange={onChange} style={{marginRight:'15px'}} /> */}
        <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
            <Button
              shape="round"
              style={{
                backgroundColor: "inherit",
                border:0,
                width: "100%",
                height: "100%",
              }}
              onClick={e => e.preventDefault()}
            >
              <BuzzAvatar userId={'you'} />
            </Button>
        </Dropdown>
          
        </Menu.Item>
      </Menu>
    </>
  );
}
