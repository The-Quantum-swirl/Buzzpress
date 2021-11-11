import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FinalPreview from '../Write/FinalPreview';
import {backendUrl, profileUrl} from '../../components/common/Path';
import { Button, Col, Row } from 'antd';
import { UserOutlined, FireFilled, FireOutlined,EyeFilled } from "@ant-design/icons";
import api from "../../service/ServiceCall";
import { Response } from '../../service/Response';

export default function Article(){
    let {articleId} = useParams();
    let views = 0, likes =0;
    const [loadedData, setLoadedData] = useState(false);
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
        if (res!==undefined){
          likes = res.likes;
          temp = res.authorName;
          views =res.views;
        }
      })

      api.getArticle(articleId).then((res) => {
        console.log(res);
        if (res!==undefined){
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
        }
      })
      
      // api post for read 1 more article

      },[])
      const bottomBar = () =>{

        return (
        <div style={{padding:'20px', paddingLeft:'25%',paddingRight:'25%' }} onScroll={handleScroll}>
          <Row 
          style={{borderTop:'1px solid grey'}}
          >
          <Col span={6}>
            <Button icon={onFire ? <FireFilled style={{color:'#f50057'}} /> : 
              <FireOutlined style={{color:'#f50057'}} />} 
              onClick={handleFire}
              style={{backgroundColor:'inherit', width:'100%', borderTop:'0'}} 
              >
              {likes + onFire? 1: 0}
            </Button>
          </Col>
          <Col offset={6} span={12}>
            <div style={{width:'100%',height:'100%', textAlign:'center', paddingTop:'4px',}}>
            <EyeFilled style={{color:'#757575'}} />
            {" views " +views}
            </div>
          </Col>
          </Row>
          
        </div>
        );
      }
 
    return(
        <>
        { loadedData === false ? <Response statusCode={404} /> :
        <>
        <NavBar />
        <FinalPreview data={loadedData} />
        {bottomBar()}
        </>
        }
        
        </>
    );
}