import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FinalPreview from '../Write/FinalPreview';
import {backendUrl, profileUrl} from '../../components/common/Path';
import { Button } from 'antd';
import { UserOutlined, FireFilled, FireOutlined } from "@ant-design/icons";
import api from "../../service/ServiceCall";

export default function Article(){
    let {articleId} = useParams();
    const [loadedData, setLoadedData] = useState({
        readTime: "5 min",
        authorLink: "",
        title: "",
        summary: "",
        contentType : [],
        content: [],
        imagelist:[],
        tag: [],
    });
    const [fireCount, setFireCount] = useState(0);
    const [onFire, setOnFire] = useState(false);
    const handleFire = () => {
      setOnFire(!onFire);

      // api.postArticleLike
    }
    const handleScroll =(e) => {
      console.log(e);
    }
    useEffect(() => {
      var temp ="Anonymous"
      api.getArticleMetaById(articleId).then((res)=>{
        console.log(res)
        setFireCount(res.likes);
        temp = res.authorName;
      })

      api.getArticle(articleId).then((res) => {
        console.log(res);
        setLoadedData({
          authorName: res.authorName || temp,
          publishDate: res.publishDate,
          readTime: res.readTime,
          authorLink: profileUrl+res.authorId,

          title:res.title,
          summary:res.summary,

          content:res.description.split("\n") || [""],
          contentType: res.textType.split("\n") || ["head"],
          imagelist: res.imagelist || [""],

          fireCount: res.fireCount || 0,
          tag: res.tag.split("\n") || [""],

        });
      })
      
      // api post for read 1 more article

      },[])    
 
    return(
        <>
        <NavBar />
        <FinalPreview data={loadedData} />
        <div style={{padding:'20px', paddingLeft:'45%'}} onScroll={handleScroll}>
          <Button icon={onFire ? <FireFilled style={{color:'#f50057'}} /> : 
            <FireOutlined style={{color:'#f50057'}} />} 
            onClick={handleFire}
            style={{backgroundColor:'inherit', padding:'2px', paddingLeft:'20px',paddingRight:'20px'}} >
            {fireCount + onFire? 1: 0}
          </Button>
        </div>
        </>
    );
}