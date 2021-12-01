import { backendUrl } from "../../components/common/Path";
import Preview from "./Preview";
import api from "../../service/ServiceCall";

export default function FinalPreview(props) {
    // preparing data for image list before previewing it
    var content = props.data.content;
    var contentType = props.data.contentType;
    var imglist=[];

    content.map( async(element, index) => {
        if (contentType[index] === 'image'){
            // content[index] is image name
            // imglist.push(backendUrl+'/uploadsnew/'+content[index]);
            imglist.push( await api.getThumbUrl(element).then((res) => {return res.data;}) )
        }
    })
    console.log(imglist);
    props.data.imagelist = imglist;
    // preparing data ends
    
    return(
        <Preview data={props.data} />
    );

}