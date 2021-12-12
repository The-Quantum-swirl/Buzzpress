import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import FinalPreview from "../Write/FinalPreview";
import { DateToMonthYearFormat } from "../../components/Date";
import { Button, Col, Row, Skeleton } from "antd";
import { Typography } from "antd";
import {
  ReadOutlined,
  FireFilled,
  FireOutlined,
  EyeFilled,
} from "@ant-design/icons";
import api from "../../service/ServiceCall";
import { Response } from "../../service/Response";
import { LoginModal } from "../../components/LoginModal";
import ReactGA from "react-ga";

const { Text, Title } = Typography;

ReactGA.initialize("UA-214937125-1");

export default function Article() {
  let { articleId } = useParams();
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [loadedData, setLoadedData] = useState(false);
  const [onFire, setOnFire] = useState(false);
  const [exist, setExist] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);

  const handleFire = () => {
    console.log("on click state " + !onFire);
    if (!onFire) {
      api.postLike(articleId);
    } else {
      api.postUnlike(articleId);
    }
    setOnFire(!onFire);
  };
  const convertNum = (num) => {
    if (num >= 1000000) return parseInt(num / 1000000) + "M+";
    else if (num >= 1000) return parseInt(num / 1000) + "k+";
    else return num;
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    var temp = "Anonymous", templikes = 20, tempUserId = undefined;
    api.getArticleMetaById(articleId)
    .then((res) => {
      console.log(res);
      if (res === undefined)  setExist(false);

      templikes = res.likes;

      // logic for like
      api.hasLiked(articleId)
      .then((res) => {
        console.log(res.data);
        // check if current user has liked the article
        if (res.data) {
          setOnFire(true);
          templikes -= 1;
        }
        setLikes(templikes);
      })
      .catch((err) => { console.log(err.response.status); });

      temp = res.authorName;
      tempUserId = res.authorId;
      setViews(res.views);
    })
    .catch((err) => {
      console.log(err.response.status);
    });

    

    api.getArticle(articleId)
    .then((res) => {
      console.log(res);
      if (res !== undefined) {
        setLoadedData({
          authorName: res.authorName || temp,
          publishDate: res.publishDate,
          readTime: res.readTime,
          authorLink: api.getProfileUrl(res.authorId),
          userId: tempUserId,
          title: res.title,
          summary: res.summary,

          content: res.description.split("\n") || [""],
          contentType: res.textType.split("\n") || ["head"],
          imagelist: [""],

          tag: res.tag.split("\n") || [""],
        });
      } else setExist(false);
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        // removing token if get 401 (unauthorized) error
        api.resetToken();
        // setting token expired to be passed to login modal for displaying
        setTokenExpired(true);
      }
    });
    // api post for read 1 more article
    api.postReadCountIncrement();
  }, [articleId]);
  // bottom bar
  const bottomBar = () => {
    return (
      <Row
        justify="center"
        className="desktop mobile"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          borderRadius: "200px",
        }}
      >
        <Col span={18} style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          {/* left top */}
          <Row>
            <Col
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ fontWeight: "500" }}>
                {"By " + loadedData.authorName}
              </Text>
              <Text style={{ marginLeft: "10px" }}>
                {DateToMonthYearFormat(loadedData.publishDate)}
              </Text>
            </Col>
          </Row>
          {/* left top ends */}

          {/* left bottom */}
          <Row>
            <Col
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text>
                <ReadOutlined style={{ color: "#757575" }} />
                {" " + loadedData.readTime + " min "}
              </Text>
              <Text style={{ marginLeft: "10px" }}>
                <EyeFilled style={{ color: "#757575" }} />
                {" " + views}
              </Text>
            </Col>
          </Row>
          {/* left bottom ends */}
        </Col>

        {/* right top-bottom */}
        <Col span={6}>
          <Button
            shape="round"
            className={onFire ? "btn-clicked" : "btn-notclicked"}
            onClick={handleFire}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Title
              level={3}
              id={onFire ? "btn-clicked-content" : "btn-notclicked-content"}
              style={{ marginBottom: 0, fontWeight: "400" }}
            >
              {onFire ? (
                <FireFilled style={{ color: "white", fontSize: "23px" }} />
              ) : (
                <FireOutlined style={{ color: "#f50057", fontSize: "23px" }} />
              )}
              {convertNum(likes + (onFire ? 1 : 0))}
            </Title>
          </Button>
        </Col>
        {/* right top-bottom ends */}
      </Row>
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
    <div style={{ paddingBottom: "20px" }}>
      <NavBar />
      <LoginModal tokenExpired={tokenExpired} />
      {loadArticle()}
    </div>
  );
}
