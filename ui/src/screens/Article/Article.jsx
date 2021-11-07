import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FinalPreview from '../Write/FinalPreview';
import {backendUrl, profileUrl} from '../../components/common/Path';
import axios from 'axios';

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

    useEffect(() => {
        axios.get( backendUrl+'/article/'+articleId )
        .then((res) => {
          console.log(res.data);
          var dt = res.data[0]
          // dt.imagelist.map((imglink) => backendUrl+'/uploads/'+imglink)
          setLoadedData({
            authorName: dt.authorName || "Anonymous",
            publishDate: dt.publishDate,
            readTime: dt.readTime,
            authorLink: profileUrl+dt.authorId,

            title:dt.title,
            summary:dt.summary,

            content:dt.description.split("\n") || [""],
            contentType: dt.textType.split("\n") || ["head"],
            imagelist: dt.imagelist || [""],

            fireCount: dt.fireCount || 0,
            tag: dt.tag.split("\n") || [""],

          });
        })
      },[])    
 
    return(
        <>
        <NavBar />
        <FinalPreview data={loadedData} />
        </>
    );
}