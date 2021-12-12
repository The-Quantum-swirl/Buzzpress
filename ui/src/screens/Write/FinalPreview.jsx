import Preview from "./Preview";
import api from "../../service/ServiceCall";

export default function FinalPreview(props) {
    // preparing data for image list before previewing it
    var content = props.data.content;
    var contentType = props.data.contentType;
    var imglist= [];

    content.map( (element, index) => {
        if (contentType[index] === 'image'){
            // content[index] is image name or link (unsplash)
            imglist.push(element)
        }
    })
    props.data.imagelist = imglist;
    // preparing data ends
    
    return(
        <Preview data={props.data} />
    );

}