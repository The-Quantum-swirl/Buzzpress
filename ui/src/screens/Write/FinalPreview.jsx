import { backendUrl } from "../common/Path";
import Preview from "./Preview";

export default function FinalPreview(props) {
    // preparing data for image list before previewing it
    var content = props.data.content;
    var contentType = props.data.contentType;
    var imglist=[];

    content.map((element, index) => {
        if (contentType[index] === 'image'){
            // content[index] is image name
            imglist.push(backendUrl+'/uploads/'+content[index]);
        }
    })
    console.log(imglist);
    props.data.imagelist = imglist;
    // preparing data ends
    
    return(
        <Preview data={props.data} />
    );

}