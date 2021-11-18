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
    if (!onFire) { api.postLike(articleId, authorId()); } 
    else { api.postUnlike(articleId, authorId());}
    setOnFire(!onFire);
  };

  useEffect(() => {
    var temp = "Anonymous", templikes = 1, tempUserId = undefined;
    api.getArticleMetaById(articleId).then((res) => {
      console.log(res);
      if (res !== undefined) {
        templikes = res.likes;
        temp = res.authorName;
        tempUserId =res.authorId;
        setViews(res.views);
        // setting likes logic don't change
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
          userId: tempUserId,
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
          margin: "20px 20% 0 20%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          borderRadius: "200px",
          padding: "0px",
        }}
      >
        <Row>
          <Col span={3}>
            <Button shape="round"
              onClick={handleFire}
              style={{
                backgroundColor: "inherit",
                width: "100%",
                borderTop: "0",
                padding:0
              }}
            >
            {onFire ? (<FireFilled style={{ color: "#f50057", fontSize:'20px' }} />) 
              : (<FireOutlined style={{ color: "#f50057", fontSize:'20px' }} /> )}
            </Button>
          </Col>
          <Col span={9}>
          <div 
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              paddingTop: "4px",
            }}
            >
            {likes + (onFire ? 1 : 0)}
          </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                paddingTop: "4px",
              }}
            >
              <EyeFilled style={{ color: "#757575" }} />
              {" " + views}
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
