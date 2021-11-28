import { Layout, Menu, Dropdown, Button, Typography, Switch } from "antd";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import BuzzAvatar from "./BuzzAvatar";
import { accessToken } from "../service/ServicePath";
const { Header } = Layout;
const { Text } = Typography;

export default function NavBar() {
  let history = useHistory();
  const [theme, setTheme] = useState("dark");
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    if (theme==="dark") setTheme("light");
    else setTheme("dark");
  }
  const logout = () => {
    localStorage.removeItem(accessToken());
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={(e) => history.push("/profile/")}>
        Your Profile
      </Menu.Item>
      <Menu.Item onClick={(e) => history.push("/create")}>
        Write Your Story
      </Menu.Item>
      <Menu.Item onClick={(e) => history.push("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item onClick={(e) => logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Menu theme={theme} mode="horizontal" 
        style={{padding:'9px 50px 9px 50px',
        boxShadow: '0 4px 18px 0 rgb(0 0 0 / 10%)'
        }}>
        <Menu.Item
          key={1}
          style={{
            fontSize: "30px",
            backgroundColor: "inherit",
          }}
          onClick={(e) => history.push("/home")}
        >
          <Text style={{color:'white'}}>1minthoughts</Text>
        </Menu.Item>
        <Menu.Item
          className='ant-dropdown-link'
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
              <BuzzAvatar />
            </Button>
        </Dropdown>
          
        </Menu.Item>
      </Menu>
    </>
  );
}
