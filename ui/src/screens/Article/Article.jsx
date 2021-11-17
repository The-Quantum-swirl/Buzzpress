import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import FinalPreview from "../Write/FinalPreview";
import { backendUrl, profileUrl } from "../../components/common/Path";
import { Button, Col, Row, Skeleton } from "antd";
import { Typography } from "antd";
import {
  UserOutlined,
  FireFilled,
  FireOutlined,
  EyeFilled,
} from "@ant-design/icons";
import api from "../../service/ServiceCall";
import { Response } from "../../service/Response";
import { authorId } from "../../constants/UserData";

const { Text, Title } = Typography;

export default function Article() {
  let { articleId } = useParams();
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [loadedData, setLoadedData] = useState(false);
  const [onFire, setOnFire] = useState(false);
  const [exist, setExist] = useState(true);
  const handleFire = () => {
    console.log("on click state " + !onFire);
    if (!onFire) {
      api.postLike(articleId, authorId());
    } else {
      api.postUnlike(articleId, authorId());
    }

    setOnFire(!onFire);
  };

  useEffect(() => {
    var temp = "Anonymous",
      templikes = 1;
    api.getArticleMetaById(articleId).then((res) => {
      console.log(res);
      if (res !== undefined) {
        templikes = res.likes;
        temp = res.authorName;
        setViews(res.views);
        if (res.likerUserId.includes(authorId())) {
          setOnFire(true);
          templikes -= 1;
        }
        setLikes(templikes);
      } else setExist(false);
    });

    api.getArticle(articleId).then((res) => {
      console.log(res);
      if (res !== undefined) {
        setLoadedData({
          authorName: res.authorName || temp,
          publishDate: res.publishDate,
          readTime: res.readTime,
          authorLink: profileUrl + res.authorId,

          title: res.title,
          summary: res.summary,

          content: res.description.split("\n") || [""],
          contentType: res.textType.split("\n") || ["head"],
          imagelist: [""],

          tag: res.tag.split("\n") || [""],
        });
      } else setExist(false);
    });

    // api post for read 1 more article
    api.postReadCountIncrement(authorId())
    
  }, []);
  // bottom bar
  const bottomBar = () => {
    return (
      <div
        style={{
          margin: "20px 25% 0 25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          borderRadius: "200px",
          padding: "0px",
        }}
      >
        <Row>
          <Col span={4}>
            <Button shape="round"
              icon={
                onFire ? (
                  <FireFilled style={{ color: "#f50057" }} />
                ) : (
                  <FireOutlined style={{ color: "#f50057" }} />
                )
              }
              onClick={handleFire}
              style={{
                backgroundColor: "inherit",
                width: "100%",
                borderTop: "0",
              }}
            >
              {likes + (onFire ? 1 : 0)}
            </Button>
          </Col>
          <Col offset={8} span={12}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                paddingTop: "4px",
              }}
            >
              <EyeFilled style={{ color: "#757575" }} />
              {" views " + views}
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  const loadArticle = () => {
    if (exist && loadedData === false) {
      return (
        <div style={{ padding: "20px" }}>
          <Skeleton avatar paragraph={{ rows: 12 }} active />
        </div>
      );
    } else if (exist === false) return <Response statusCode={404} />;
    else {
      return (
        <>
          <FinalPreview data={loadedData} />
          {bottomBar()}
        </>
      );
    }
  };

  return (
    <div style={{paddingBottom:'20px'}}>
      <NavBar />
      {loadArticle()}
    </div>
  );
}
