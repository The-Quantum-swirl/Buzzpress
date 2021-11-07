import { Result, Button } from 'antd';

export function Error(props){
    const statusCode = props.statusCode|| 404;
    return (
        <>
        <Result
            status={statusCode}
            title={statusCode}
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
        </>
    );
}
  