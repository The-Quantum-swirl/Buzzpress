import { Skeleton, Switch, Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function InfoCard(props) {
  if (props === undefined) {
    return <> </>;
  }
  const loading = false;
  const title = props.title;
  const description = props.description;
  return (
    <>
      <Card
        style={{ width: 500, marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            title={title}
            description={description}
          />
        </Skeleton>
      </Card>
    </>
  );
}
