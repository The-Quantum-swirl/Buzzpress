import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";

export function Response(props){
    let history =useHistory();
    const statusCode = props.statusCode|| 404;

    if (statusCode === 500){
        return (
        <Result
            status={500}
            title={500}
            subTitle="Failed to Post"
            extra={<Button type="primary" onClick={(e) => history.push("/home")}>Back Home</Button>}
        />
        );
    }
    else if (statusCode === 404){
        return (
        <Result
            status={404}
            title={404}
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={(e) => history.push("/home")}>Back Home</Button>}
        />
        );
    }
    else{
        return (
        <Result
            status="success"
            title="Article Successfully Published!"
            subTitle="Server configuration takes 1-5 minutes, please wait."
            extra={<Button type="primary" onClick={(e) => history.push("/home")}>Back Home</Button>}
        />
        );
    }
}